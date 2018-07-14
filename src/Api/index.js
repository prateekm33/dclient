import { AsyncStorage } from "react-native";
import config from "../../config";
import {
  createVendor,
  createCustomer,
  createDeal,
  createMyLoyaltyRewardCard,
  createLoyaltyReward,
  createMyDeal
} from "../Models";
import { valExists, logger } from "../utils";

class Api {
  static headers = {};
  constructor(root, options) {
    options = options || {};
    this.root = root;
    this.headers = { ...Api.headers };
    this.headers = { ...this.headers, ...(options.headers || {}) };
  }

  fetch = (url, options) => {
    options = options || {};
    const headers = { ...this.headers, ...(options.headers || {}) };
    delete options.headers;
    const requestOptions = {
      headers,
      ...options
    };

    return fetch(config.api.root + url, requestOptions)
      .then(this.checkResponseForErrors)
      .then(this.saveTokenAndCustomerFromResponse)
      .catch(err => {
        if (err.IS_HASH_ERROR) {
          logger.warn(
            `API ERROR : ${options.method || "GET"} | ${config.api.root + url}`,
            err.message
          );
          throw err;
        } else {
          console.warn("----backend server down error : ", url, err);
          throw { message: "Backend server is down." };
        }
      });
  };

  checkResponseForErrors = unprocessedResponse => {
    return unprocessedResponse.json().then(res => {
      if (res && res.error) throw res;
      if (res === false) throw res;
      return res;
    });
  };

  get = (url, options) => {
    return this.fetch(url, ...(options || {}));
  };

  post = (url, body, options) => {
    return this.fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  put = (url, body, options) => {
    return this.fetch(url, {
      method: "put",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  delete = (url, body, options) => {
    return this.fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  saveTokenAndCustomerFromResponse = res => {
    if (!res) return res;
    const customer = res.customer;
    if (!customer) return res;
    if (res.user_token) this.saveToken(res.user_token);
    if (customer.uuid === res.user_uuid) {
      this.customer = createCustomer({ ...customer, is_authenticated: true });
    } else if (!this.customer && res.customer)
      this.customer = createCustomer({
        ...res.customer,
        is_authenticated: true
      });
    return res;
  };

  saveToken = token => {
    if (!valExists(token) || this.token === token) return;

    this.token = token;
    this.headers.authorization = `Bearer ${this.token}`;
    return AsyncStorage.mergeItem("customer", JSON.stringify({ token }));
  };

  logout = () => {
    this.customer = null;
    AsyncStorage.removeItem("customer");
    return Promise.resolve();
    // return this.get(config.api.logout);
  };

  loginCustomer = customer => {
    return this.post(config.api.customer.login, { customer })
      .then(this.saveTokenAndCustomerFromResponse)
      .then(res => createCustomer(res.customer));
  };

  signupCustomer = customer => {
    return this.post(config.api.customer.root, { customer })
      .then(this.saveTokenAndCustomerFromResponse)
      .then(res => createCustomer(res.customer));
  };

  getCustomer = customer => {
    if (!customer || !customer.uuid)
      throw { message: "No customer uuid passed." };
    return this.get(config.api.customer.root + "/" + customer.uuid).then(res =>
      createCustomer(res.customer)
    );
  };

  updateCustomer = updates =>
    this.put(config.api.customer.root + "/" + this.customer.uuid, {
      updates
    }).then(res => createCustomer(res.customer));

  deleteCustomer = () =>
    this.delete(config.api.customer.root + "/" + this.customer.uuid).then(
      () => true
    );

  getMyDeals = ({ limit, offset }) => {
    limit = +limit || 20;
    offset = +offset || 0;
    let url = `${config.api.customer.deals}/${
      this.customer.uuid
    }?limit=${limit}&ofset=${offset}`;
    return this.get(url).then(res => ({
      deals: res.deals.map(deal => {
        return createMyDeal({ ...deal.data.deal, vendor: deal.data.vendor });
      }),
      end: res.end,
      count: res.count
    }));
  };

  getMyDeal = ({ deal_uuid, vendor_uuid }) =>
    this.get(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid
    ).then(res =>
      createMyDeal({ ...res.deal.data.deal, vendor: res.deal.data.vendor })
    );

  saveDeal = ({ deal_uuid, vendor_uuid, deal }) =>
    this.post(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid,
      {
        deal: { is_saved: true }
      }
    ).then(res => createMyDeal({ ...deal, ...res.deal }));

  unSaveDeal = ({ deal_uuid, vendor_uuid }) =>
    this.put(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid,
      { updates: { is_saved: false } }
    ).then(res => createMyDeal(res.deal));

  archiveDeal = ({ deal_uuid, vendor_uuid }) =>
    this.put(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid,
      { updates: { is_archived: true } }
    ).then(res => createMyDeal(res));

  deleteDeal = ({ deal_uuid, vendor_uuid }) =>
    this.put(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid,
      { updates: { is_deleted: true } }
    ).then(res => createMyDeal(res));

  destroyDeal = ({ deal_uuid, vendor_uuid }) =>
    this.delete(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid
    );

  getMyRewardsCards = ({ limit, offset }) => {
    limit = +limit || 20;
    offset = +offset || 0;
    let url = `${config.api.customer.rewards}/${
      this.customer.uuid
    }?limit=${limit}&offset=${offset}`;
    return this.get(url).then(res => {
      return {
        loyalty_rewards: res.loyalty_rewards.map(reward => {
          return createMyLoyaltyRewardCard({
            ...reward.data.loyalty_reward,
            vendor: reward.data.vendor
          });
        }),
        count: res.count,
        end: res.end
      };
    });
  };

  getMyRewardsCard = ({ loyalty_reward_uuid, vendor_uuid }) =>
    this.get(
      config.api.customer.rewards +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        loyalty_reward_uuid
    ).then(res =>
      createMyLoyaltyRewardCard({
        ...res.loyalty_reward.data.loyalty_reward,
        vendor: res.loyalty_reward.data.vendor
      })
    );

  joinRewardsCard = ({ loyalty_reward, loyalty_reward_uuid, vendor_uuid }) =>
    this.post(
      config.api.customer.rewards +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        loyalty_reward_uuid
    ).then(res =>
      createMyLoyaltyRewardCard({
        ...loyalty_reward,
        ...res.loyalty_reward
      })
    );

  leaveRewardsCard = ({ loyalty_reward_uuid, vendor_uuid }) =>
    this.delete(
      config.api.customer.rewards +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        loyalty_reward_uuid
    );

  getVendorDeals = ({ vendor_uuid, deal_uuid, limit, offset }) => {
    let url = config.api.vendors.deals + "/" + vendor_uuid;
    if (deal_uuid) url += "/" + deal_uuid;
    else {
      limit = limit || 20;
      offset = offset || 0;
    }
    url += `?limit=${limit}&offset=${offset}`;

    return this.get(url).then(res => {
      if (res.deal)
        return createDeal({
          ...res.deal.data.deal,
          vendor: res.deal.data.vendor
        });
      else if (res.deals)
        return res.deals.map(deal => {
          return createDeal({
            ...deal.data.deal,
            vendor: deal.data.vendor.data
          });
        });
    });
  };
  getVendorRewards = ({ vendor_uuid, loyalty_reward_uuid }) => {
    let url = config.api.vendors.rewards + "/" + vendor_uuid;
    if (loyalty_reward_uuid) url += "/" + loyalty_reward_uuid;
    return this.get(url).then(res => {
      if (res.loyalty_reward)
        return createLoyaltyReward({
          ...res.loyalty_reward.data.loyalty_reward,
          vendor: res.loyalty_reward.data.vendor
        });
      else if (res.loyalty_rewards)
        return res.loyalty_rewards.map(reward =>
          createLoyaltyReward({
            ...reward.data.loyalty_reward,
            vendor: reward.data.vendor
          })
        );
    });
  };

  registerDeviceToken = device_token => {
    return this.post(config.api.notifications.register, { device_token });
  };

  getVendors = (vendor_uuid, { limit, offset, type }) => {
    limit = +limit || 20;
    offset = +offset || 0;
    let url = config.api.vendors.root;
    if (vendor_uuid) url + "/" + vendor_uuid;
    else url += `limit=${limit}&offset=${offset}&type=${type}`;
    return this.get(url).then(res => {
      if (res.vendor) return createVendor(res.vendor);
      else if (res.vendors) return res.vendors.map(createVendor);
    });
  };

  getDeals = ({ limit, offset }) => {
    limit = +limit || 20;
    offset = +offset || 0;
    return this.get(config.api.deals + `?limit=${limit}&offset=${offset}`).then(
      res => {
        return {
          deals: res.deals.map(deal => {
            return createDeal({
              ...deal.data.deal,
              vendor: deal.data.deal.vendor.data
            });
          }),
          count: res.count,
          end: res.end
        };
      }
    );
  };

  getLoyaltyRewards = ({ limit, offset }) => {
    limit = +limit || 20;
    offset = +offset || 0;
    return this.get(
      config.api.loyalty_rewards + `?limit=${limit}&offset=${offset}`
    ).then(res => {
      return {
        loyalty_rewards: res.loyalty_rewards.map(reward =>
          createLoyaltyReward({
            ...reward.data.loyalty_reward,
            vendor: reward.data.loyalty_reward.vendor.data
          })
        ),
        count: res.count,
        end: res.end
      };
    });
  };

  getSavedDeals = ({ limit, offset }) => {
    limit = +limit || 20;
    offset = +offset || 0;
    let url =
      config.api.customer.deals + "/" + this.customer.uuid + "?is_saved=true&";
    url += `limit=${limit}&offset=${offset}`;
    return this.get(url).then(res => {
      return {
        deals: res.deals.map(createMyDeal),
        count: res.count,
        end: res.end
      };
    });
  };

  createMyDeal = ({ deal_uuid, vendor_uuid }) =>
    this.post(
      config.api.customer.deals +
        "/" +
        this.customer.uuid +
        "/" +
        vendor_uuid +
        "/" +
        deal_uuid
    );

  changePasswordRequest = () =>
    this.post(config.api.customer.password.forgot, {
      customer: { email: this.customer.email }
    }).then(() => true);

  // TODO...put back in
  // sendFeedback = msg => {
  //   return this.post(config.api.feedback, { message: { text: msg } });
  // };

  // sendInvites = invitees => {
  //   return this.post(config.api.invites, { invitees });
  // };
}

export default new Api(config.api.root);
