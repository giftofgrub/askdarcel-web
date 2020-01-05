import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AddressInfo,
  PhoneNumber,
  ResourceCategories,
  Website,
  Email,
} from 'components/listing/ResourceInfos';
import {
  ActionSidebar,
  TableOfOpeningTimes,
  MobileActionBar,
} from 'components/listing';
import { MapOfLocations } from 'components/maps';
import { RelativeOpeningTime } from 'components/listing/RelativeOpeningTime';
import Services from 'components/listing/Services';
import Notes from 'components/listing/Notes';
import MOHCDBadge from 'components/listing/MOHCDBadge';
import Loader from 'components/ui/Loader';
import * as dataService from '../utils/DataService';
import { getSiteTitle } from '../utils/whitelabel';

const getResourceLocation = resource => {
  const { address } = resource;
  if (!address) return null;

  return {
    id: address.id,
    address,
    name: resource.name,
    recurringSchedule: resource.recurringSchedule,
  };
};

class BaseOrganizationListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: null,
    };
    this.verifyResource = this.verifyResource.bind(this);
  }

  componentDidMount() {
    this.loadResourceFromServer();
  }

  loadResourceFromServer() {
    const { match: { params: { id } } } = this.props;
    dataService.getResource(id).then(resource => {
      this.setState({ resource });
    });
  }

  verifyResource() {
    const {
      resource: {
        id,
      },
    } = this.state;
    const changeRequest = {
      verified_at: new Date().toISOString(),
    };
    dataService.post(`/api/resources/${id}/change_requests`, { change_request: changeRequest }).then(response => {
      // TODO: Do not use alert() for user notifications.
      if (response.ok) {
        alert('Resource verified. Thanks!'); // eslint-disable-line no-alert
      } else {
        alert('Issue verifying resource. Please try again.'); // eslint-disable-line no-alert
      }
    });
  }


  render() {
    const { resource } = this.state;
    if (!resource || !window.google) {
      return <Loader />;
    }

    const { notes } = resource;
    const resourceLocation = getResourceLocation(resource);
    return (
      <div>
        <Helmet>
          <title>
            {`${resource.name} | ${getSiteTitle()}`}
          </title>
          <meta name="description" content={resource.long_description} />
        </Helmet>
        <div className="org-container">
          <article className="org" id="resource">
            <div className="org--main">
              <div className="org--main--left">
                <header className="org--main--header">
                  <div className="org--main--header--title-container">
                    <h1 className="org--main--header--title">{resource.name}</h1>
                    <MOHCDBadge resource={resource} />
                  </div>
                  <div className="org--main--header--hours">
                    <RelativeOpeningTime recurringSchedule={resource.recurringSchedule} />
                  </div>
                  { resource.phones.length > 0
                    && (
                      <div className="org--main--header--phone">
                        <PhoneNumber phones={resource.phones} />
                      </div>
                    )
                  }
                </header>
                <MobileActionBar resource={resource} />
                <div className="org--main--header--description">
                  <h2>About this Organization</h2>
                  <ReactMarkdown className="rendered-markdown" source={resource.long_description || resource.short_description || 'No Description available'} />
                </div>

                <section className="service--section" id="services">
                  <header className="service--section--header">
                    <h4>Services</h4>
                  </header>
                  <Services
                    description={resource.long_description}
                    services={resource.services}
                  />
                </section>

                <Notes notes={notes} id="notes" />

                <section className="info--section" id="info">
                  <header className="service--section--header">
                    <h4>Info</h4>
                  </header>
                  <ul className="info">
                    <div className="info--column">
                      {resource.categories.length > 0
                        && <ResourceCategories categories={resource.categories} />}
                      {resource.address && <AddressInfo address={resource.address} />}
                      {resource.phones.length > 0 && <PhoneNumber phones={resource.phones} />}
                      {resource.website && <Website website={resource.website} />}
                      {resource.email && <Email email={resource.email} />}
                    </div>
                  </ul>
                </section>

                {resourceLocation && (
                  <section className="location--section">
                    <header className="service--section--header">
                      <h4>Location</h4>
                    </header>
                    <MapOfLocations
                      locations={[resourceLocation]}
                      locationRenderer={location => (
                        <TableOfOpeningTimes
                          recurringSchedule={location.recurringSchedule}
                        />
                      )}
                    />
                  </section>
                )}
              </div>

              <div className="org--aside">
                <ActionSidebar resource={resource} />
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

BaseOrganizationListingPage.defaultProps = {
  userLocation: null,
};

BaseOrganizationListingPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // userLocation is not required because will be lazy-loaded after initial render.
  userLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

const mapStateToProps = state => ({ userLocation: state.user.location });

export const OrganizationListingPage = connect(mapStateToProps)(BaseOrganizationListingPage);
