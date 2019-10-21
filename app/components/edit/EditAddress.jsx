import React, { Component } from 'react';

import _ from 'lodash';
import editCollectionHOC from './EditCollection';

const hasNoLocation = address => {
  const someFieldExistsOrNewAddress = typeof address === 'undefined'
    || address.name !== '' || address.address_1 !== ''
    || address.address_2 !== '' || address.address_3 !== ''
    || address.address_4 !== '' || address.city !== '' || address.postal_code !== ''
    || address.state_province !== '' || address.country !== '';
  if (someFieldExistsOrNewAddress) {
    return false;
  }
  return true;
};

class EditAddress extends Component {
  constructor(props) {
    super(props);

    const { item } = this.props;

    this.state = { 
      address: _.clone(item), 
      noLocation: hasNoLocation(props.address) 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNoLocationChange = this.handleNoLocationChange.bind(this);
  }

  handleChange(e) {
    const { field } = e.target.dataset;
    const { value } = e.target;
    const { address } = this.state;
    const { updateAddress, index, item } = this.props;
    address[field] = value;
    // this.setState(address, () => {
    //   updateAddress(address);
    // });
    if (address[field] || value !== item[field]) {
      address[field] = value;
      this.setState({ address });
      updateAddress(index, address);
    }
  }

  handleNoLocationChange() {
    const { updateAddress } = this.props;
    this.setState(state => {
      const { address } = this.props;
      let newAddr;
      if (state.noLocation) {
        newAddr = address;
      } else {
        newAddr = {
          name: '',
          address_1: '',
          address_2: '',
          address_3: '',
          address_4: '',
          city: '',
          country: '',
          postal_code: '',
          state_province: '',
        };
      }
      return { noLocation: !state.noLocation, address: newAddr };
    }, () => {
      const { address } = this.state;
      updateAddress(index, address);
    });
  }

  render() {
    const { index, item: address } = this.props;
    const htmlID = `address${index}`;
    const { noLocation } = this.state;
    return (
      <AddressForm
        handleChange={this.handleChange}
        handleNoLocationChange={this.handleNoLocationChange}
        noLocation={noLocation}
        address={address}
        htmlID={htmlID}
      />
    );
  }
}

const AddressForm = ({
  noLocation, handleNoLocationChange, handleChange, address, htmlID
}) => (
  <li key="address" className="edit--section--list--item">
    <label htmlFor={htmlID}>Address</label>
    <label>
      <input
        id={htmlID}
        type="checkbox"
        className="input-checkbox"
        checked={noLocation}
        onChange={handleNoLocationChange}
      />
        No Physical Location
    </label>
    {!noLocation
        && (
          <div>
            <input
              type="text"
              className="input"
              placeholder="Name"
              data-field="name"
              defaultValue={address.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Address 1"
              data-field="address_1"
              defaultValue={address.address_1}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Address 2"
              data-field="address_2"
              defaultValue={address.address_2}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Address 3"
              data-field="address_3"
              defaultValue={address.address_3}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Address 4"
              data-field="address_4"
              defaultValue={address.address_4}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="City"
              data-field="city"
              defaultValue={address.city}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="State/Province"
              data-field="state_province"
              defaultValue={address.state_province}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Country"
              data-field="country"
              defaultValue={address.country}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Postal/Zip Code"
              data-field="postal_code"
              defaultValue={address.postal_code}
              onChange={handleChange}
            />
          </div>
        )
    }
  </li>
);

const EditAddresses = editCollectionHOC(EditAddress, 'Addresses', {}, true);
EditAddresses.displayName = 'EditAddresses';

export default EditAddresses;
