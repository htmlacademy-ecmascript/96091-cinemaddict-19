import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CardsApiService extends ApiService {
  get cards() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async updateCard(card) {
    const response = await this._load({
      url: `movies/${card.id}`,
      method: Method.PUT,
      body: JSON.stringify(card),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
