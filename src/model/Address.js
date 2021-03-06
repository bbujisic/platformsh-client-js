import Ressource from "./Ressource";
import { getConfig } from "../config";
import _urlParser from "../urlParser";
import request from "../api";
import pick from "object.pick";
import Result from "./Result";

const url = "/v1/profiles/:id/address";
const paramDefaults = {};

export default class Address extends Ressource {
  constructor(account) {
    const { id } = account;
    const { account_url } = getConfig();

    super(`${account_url}${url}`, paramDefaults, { id }, account);
    this._queryUrl = Address.getQueryUrl(`${account_url}${url}`, id);
    console.log(this._queryUrl);
    this.id = "";
    this.country = "";
    this.name_line = "";
    this.premise = "";
    this.sub_premise = "";
    this.thoroughfare = "";
    this.administrative_area = "";
    this.sub_administrative_area = "";
    this.locality = "";
    this.dependent_locality = "";
    this.postal_code = "";

    this._modifiableField = [
      "country",
      "name_line",
      "premise",
      "sub_premise",
      "thoroughfare",
      "administrative_area",
      "sub_administrative_area",
      "locality",
      "dependent_locality",
      "postal_code"
    ];
  }

  static getQueryUrl(_url, id) {
    return _urlParser(_url, { id });
  }

  static get(params, customUrl) {
    const { id, ...queryParams } = params;
    const { account_url } = getConfig();

    return super.get(
      this.getQueryUrl(customUrl || `${account_url}${url}`, id),
      { id },
      paramDefaults,
      queryParams
    );
  }

  static query(params) {
    const { account_url } = getConfig();
    const { id } = params;

    return super.query(
      this.getQueryUrl(`${account_url}${url}`, id),
      {},
      paramDefaults,
      params
    );
  }

  update(address) {
    const { account_url } = getConfig();
    const url = Address.getQueryUrl(`${account_url}${url}`, this.id);
    super.update(address, url);
  }
}
