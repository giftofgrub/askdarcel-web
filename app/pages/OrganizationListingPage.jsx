import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {
  AddressInfo,
  PhoneNumber,
  ResourceCategories,
  Website,
  Email,
  StreetView,
} from 'components/listing/ResourceInfos';
import {
  ActionSidebar,
  TableOfOpeningTimes,
  MobileActionBar,
} from 'components/listing';
import { RelativeOpeningTime } from 'components/listing/RelativeOpeningTime';
import Services from 'components/listing/Services';
import Notes from 'components/listing/Notes';
import Loader from 'components/ui/Loader';
import HAPcertified from '../assets/img/ic-hap.png';
import MOHCDFunded from '../assets/img/ic-mohcd-funded-services.png';
import * as dataService from '../utils/DataService';
import { isSFServiceGuideSite } from '../utils/whitelabel';

export class OrganizationListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: null,
    };
    this.verifyResource = this.verifyResource.bind(this);
    this.isMOHCDFunded = this.isMOHCDFunded.bind(this);
  }

  componentDidMount() {
    this.loadResourceFromServer();
  }

  loadResourceFromServer() {
    const {
      location: {
        query: {
          id,
        },
      },
    } = this.props;
    const url = `/api/resources/${id}`;

    fetch(url, { credentials: 'include' }).then(r => r.json()).then(data => {
      this.setState({ resource: data.resource });
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

  isMOHCDFunded() {
    const { resource } = this.state;
    let isMOHCDFunded = false;

    // eslint-disable-next-line
    resource && resource.categories.forEach(category => {
      if (category.name === 'MOHCD Funded') {
        isMOHCDFunded = true;
      }
    });

    return isMOHCDFunded;
  }

  render() {
    const { resource } = this.state;
    if (!resource || !window.google) {
      return <Loader />;
    }

    const { userLocation } = this.props;
    const { notes } = resource;
    const isMOHCDFunded = this.isMOHCDFunded();
    return (
      <div>
        <Helmet>
          <title>
            {resource.name}
              |
            {' '}
            {
              isSFServiceGuideSite()
                ? 'SF Service Guide'
                : 'AskDarcel'
            }
          </title>
          <meta name="description" content={resource.long_description} />
        </Helmet>
        <div className="org-container">
          <article className="org" id="resource">
            <div className="org--main">
              <div className="org--main--left">

                <header className="org--main--header">
                  <div className="badges">
                    {resource.certified && (<img className="certified" src={HAPcertified} alt="Verified by the Homeless Assistance Project" />)}
                    {isMOHCDFunded && (<img className="mohcd-funded" src={MOHCDFunded} alt="Verified by MOHCD" />)}
                  </div>
                  <h1 className="org--main--header--title">{resource.name}</h1>
                  <div className="org--main--header--rating disabled-feature">
                    <p className="excellent">
                      <i className="material-icons">sentiment_very_satisfied</i>
                      <i className="material-icons">sentiment_very_satisfied</i>
                      <i className="material-icons">sentiment_very_satisfied</i>
                      <i className="material-icons">sentiment_very_satisfied</i>
                      <i className="material-icons">sentiment_very_satisfied</i>
                    </p>
                  </div>
                  <div className="org--main--header--hours">
                    <RelativeOpeningTime schedule={resource.schedule} />
                  </div>
                  <div className="org--main--header--phone">
                    <PhoneNumber phones={resource.phones} />
                  </div>
                  <div className="org--main--header--description">
                    <header>About this resource</header>
                    <ReactMarkdown className="rendered-markdown" source={resource.long_description || resource.short_description || 'No Description available'} />
                  </div>
                </header>

                <MobileActionBar resource={resource} />

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
                      <ResourceCategories categories={resource.categories} />
                      {' '}
                      {resource.address && <AddressInfo address={resource.address} />}
                      <PhoneNumber phones={resource.phones} />
                      <Website website={resource.website} />
                      <Email email={resource.email} />
                    </div>
                    <div className="info--column">
                      <TableOfOpeningTimes schedule={resource.schedule} />
                    </div>
                  </ul>
                </section>
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

OrganizationListingPage.defaultProps = {
  userLocation: null,
};

OrganizationListingPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({ resourceid: PropTypes.string }).isRequired,
  }).isRequired,
  // userLocation is not required because will be lazy-loaded after initial render.
  userLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};
