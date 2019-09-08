import { ReactSelector } from 'testcafe-react-selectors';
import config from '../config';

export default class ResourcePage {
  constructor() {
    const baseSelectorName = 'ServicePage';
    const baseSelector = ReactSelector(baseSelectorName);
    this.address = baseSelector.find('.listing--main--left--hours header strong');
    this.description = baseSelector.find('.listing--main--left--about div');
    this.details = baseSelector.find('.listing--main--left--details');
    this.directionsButton = baseSelector.find('.action-sidebar--directions');
    this.editButton = baseSelector.find('.action-sidebar--edit');
    this.name = baseSelector.find('.listing--main--left > header h1');
    this.note = this.details.find('tbody td');
    this.phone = baseSelector.find('.listing--main--left--contact tbody td');
    this.printButton = baseSelector.find('.action-sidebar--print');
    this.schedule = baseSelector.findReact('TableOfOpeningTimes tbody tr');
    this.url = serviceId => `${config.baseUrl}/services/${serviceId}`;
  }
}
