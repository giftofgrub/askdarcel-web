import { ReactSelector } from 'testcafe-react-selectors';
import config from '../config';

export default class ServicePage {
  constructor() {
    const baseSelectorName = 'ServicePage';
    const baseSelector = ReactSelector(baseSelectorName);
    this.address = baseSelector.find('.listing--main--left--hours header strong');
    this.applicationProcess = baseSelector.find('.listing--main--left--details tr:nth-child(1) td');
    this.cost = baseSelector.find('.listing--main--left--details tr:nth-child(3) td');
    this.description = baseSelector.find('.listing--main--left--about div');
    this.details = baseSelector.find('.listing--main--left--details');
    this.directionsButton = baseSelector.find('.action-sidebar--directions');
    this.editButton = baseSelector.find('.action-sidebar--edit');
    this.email = baseSelector.find('.listing--main--left--contact tr:nth-child(2) td');
    this.name = baseSelector.find('.listing--main--left > header h1');
    this.note = this.details.find('tbody td');
    this.phone = baseSelector.find('.listing--main--left--contact tbody td');
    this.printButton = baseSelector.find('.action-sidebar--print');
    this.requiredDocs = baseSelector.find('.listing--main--left--details tr:nth-child(2) td');
    this.schedule = baseSelector.findReact('TableOfOpeningTimes tbody tr');
    this.url = serviceId => `${config.baseUrl}/services/${serviceId}`;
  }
}
