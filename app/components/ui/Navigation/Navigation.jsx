import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import { images } from 'assets';
import styles from './Navigation.scss';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      showSecondarySearch: false,
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.toggleSecondarySearch = this.toggleSecondarySearch.bind(this);
  }

  onQueryChanged(e) {
    this.setState({ query: e.target.value });
  }

  submitSearch(e) {
    e.preventDefault();
    const { history } = this.props;
    const { query } = this.state;
    if (query) {
      const queryString = qs.stringify({ query });
      history.push(`/search?${queryString}`);
      window.location.reload();
    }
    return false;
  }

  toggleSecondarySearch() {
    this.setState(({ showSecondarySearch }) => ({ showSecondarySearch: !showSecondarySearch }));
  }

  render() {
    const { showSearch, toggleHamburgerMenu } = this.props;
    const { showSecondarySearch, query } = this.state;
    return (
      <nav className={styles.siteNav}>
        <div className={styles.primaryRow}>
          <div className={styles.navLeft}>
            <Link className={styles.navLogo} to="/">
              <img src={images.logoSmall} alt="Ask Darcel" />
            </Link>
            {showSearch
              && (
                <form
                  onSubmit={this.submitSearch}
                  className={`${styles.navSearch} search-container form-row`}
                  role="search"
                >
                  <input
                    onChange={this.onQueryChanged}
                    value={query}
                    type="text"
                    className={styles.searchField}
                    placeholder="Search for a service or organization"
                    name="srch-term"
                    id="srch-term"
                  />
                </form>
              )
            }
          </div>
          <div className={styles.mobileNavigation}>
            <button type="button" className={styles.searchButton} onClick={this.toggleSecondarySearch} />
            <button type="button" className={styles.hamburgerButton} onClick={toggleHamburgerMenu} />
          </div>
          <ul className={styles.navRight}>
            <li>
              <Link to="/about">
                About
              </Link>
            </li>
            <li>
              <a href="https://help.sfserviceguide.org" target="_blank" rel="noopener noreferrer">
                FAQ
              </a>
            </li>
            <li>
              <a href="https://help.sfserviceguide.org/en/collections/1719243-contact-us" target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.secondaryRowWrapper} ${showSecondarySearch ? '' : styles.hide}`}>
          <div className={styles.secondaryRow}>
            <form
              onSubmit={this.submitSearch}
              role="search"
            >
              <input
                onChange={this.onQueryChanged}
                value={query}
                className={styles.secondarySearchField}
                type="text"
                /* TODO: update placeholder text to include dynamic number of resources */
                placeholder="Search for a service or organization"
              />
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  toggleHamburgerMenu: PropTypes.func.isRequired,
};

export default withRouter(Navigation);
