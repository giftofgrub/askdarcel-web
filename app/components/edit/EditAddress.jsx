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
    console.log('No address exists');
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
      noLocation: hasNoLocation(props.address),
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNoLocationChange = this.handleNoLocationChange.bind(this);
  }

  handleAddressChange(e) {
    const { field } = e.target.dataset;
    const { value } = e.target;
    const { address } = this.state;
    const { updateAddress, index, item } = this.props;

    if (address[field] || value !== item[field]) {
      address[field] = value;
      this.setState({ address });
      updateAddress(address);
    }
  }

  handleNoLocationChange() {
    const { updateAddress } = this.props;
    this.setState(state => {
      const { address } = this.props;
      let newAddr;
      if (state.noLocation) {
        newAddr = address;
        console.log(`found address: ${address}`);
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
      console.log(`no address: ${newAddr}`);
      return { noLocation: !state.noLocation, address: newAddr };
    }, () => {
      const { index, address } = this.state;
      console.log(`INDEX ${index}`);
      updateAddress(address);
    });
  }

  render() {
    const { index, item: address } = this.props;
    const htmlID = `address${index}`;
    const { noLocation } = this.state;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            className="input-checkbox"
            checked={noLocation}
            onChange={this.handleNoLocationChange}
          />
            No Physical Location
        </label>

        <AddressForm
          handleAddressChange={this.handleAddressChange}
          noLocation={noLocation}
          address={address}
          htmlID={htmlID}
        />
      </div>
    );
  }
}

const AddressForm = ({
  noLocation, handleAddressChange, address, htmlID,
}) => (
  <li key="address" className="edit--section--list--item">


    {!noLocation
        && (
          <div>
            <label htmlFor={htmlID}>Address</label>
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Name"
              data-field="name"
              defaultValue={address.name}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Address 1"
              data-field="address_1"
              defaultValue={address.address_1}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Address 2"
              data-field="address_2"
              defaultValue={address.address_2}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Address 3"
              data-field="address_3"
              defaultValue={address.address_3}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Address 4"
              data-field="address_4"
              defaultValue={address.address_4}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="City"
              data-field="city"
              defaultValue={address.city}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="State/Province"
              data-field="state_province"
              defaultValue={address.state_province}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Country"
              data-field="country"
              defaultValue={address.country}
              onChange={handleAddressChange}
            />
            <input
              id={htmlID}
              type="text"
              className="input"
              placeholder="Postal/Zip Code"
              data-field="postal_code"
              defaultValue={address.postal_code}
              onChange={handleAddressChange}
            />
          </div>
        )
    }
  </li>
);

const EditAddresses = editCollectionHOC(EditAddress, 'Addresses', {}, true);
EditAddresses.displayName = 'EditAddresses';

export default EditAddresses;
