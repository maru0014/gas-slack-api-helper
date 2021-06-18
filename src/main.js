class SlackAPI {
  constructor(token) {
    this.TOKEN = token;
    this.BASE_URI = "https://slack.com";
    this.API_ENDPOINT = `${this.BASE_URI}/api/`;
    this.AUTH_ENDPOINT = `${this.BASE_URI}/oauth/authorize/`;
  }

  /**
   * Requestを送信
   * @param {string} method リクエストメソッド
   * @param {string} api_method SlackAPIのメソッド
   * @param {object} payload パラメータ
   * @return {object} 実行結果
   */
  request(method, api_method, payload) {
    const response = UrlFetchApp.fetch(`${this.API_ENDPOINT}${api_method}`, {
      method: method,
      contentType: "application/x-www-form-urlencoded",
      headers: { Authorization: `Bearer ${this.TOKEN}` },
      payload: payload,
    });
    const json = JSON.parse(response);
    console.log(
      `Slack API (${api_method}) \nok: ${json.ok} \nresponse: ${response}`
    );

    if (json.ok === false) {
      throw new Error(
        `Slack API Error「${json.error}」\nエラーコードをご確認ください。\nhttps://api.slack.com/methods/${api_method}#errors`
      );
    }

    return json;
  }

  /**
   * チャンネルリストを取得
   * @param {boolean} exclude_archived アーカイブされたchannelを含める Default:true
   * @param {string} types public_channel / private_channel Default:public_channel,private_channel
   * @param {integer} limit 取得件数上限 Default:100
   * @return {object} 実行結果
   */
  getChannels(
    exclude_archived = true,
    types = "public_channel,private_channel",
    limit = 100
  ) {
    const api_method = "conversations.list";
    const payload = {
      exclude_archived: exclude_archived,
      types: types,
      limit: limit,
    };
    const res = this.request("post", api_method, payload);
    return res.channels;
  }

  /**
   * ユーザーリストを取得
   * @return {object} 実行結果
   */
  getUsers() {
    const api_method = "users.list";
    const payload = {};
    const res = this.request("post", api_method, payload);
    return res.members;
  }

  /**
   * チャンネル作成
   * @param {string} channel_name 作成するチャンネル名
   * @param {boolian} is_private プライベートにする Default:true
   * @return {object} 実行結果
   */
  createChannel(channel_name, is_private = true) {
    const api_method = "conversations.create";
    const payload = {
      name: channel_name,
      is_private: is_private,
    };
    const res = this.request("post", api_method, payload);
    return res.channel;
  }

  /**
   * チャンネルにユーザを追加
   * @param {string} channel_id チャンネルID
   * @param {string} user_id ユーザーIDをカンマ区切りで指定
   * @return {object} 実行結果
   */
  inviteChannel(channel_id, user_id) {
    const api_method = "conversations.invite";
    const payload = {
      channel: channel_id,
      users: user_id,
    };
    return this.request("post", api_method, payload);
  }

  /**
   * IMを開く
   * @param {string} users ユーザーIDをカンマ区切りで指定
   * @return {object} 実行結果
   */
  openIM(users) {
    const api_method = "conversations.open";
    const payload = {
      users: users,
    };
    const res = this.request("post", api_method, payload);
    return res.channel;
  }

  /**
   * チャンネルにメッセージを投稿
   * @param {string} channel_id チャンネルID または チャンネル名（例）#general
   * @param {string} text 投稿内容
   * @return {object} 実行結果
   */
  postMessage(channel_id, text) {
    const api_method = "chat.postMessage";
    const payload = {
      channel: channel_id,
      text: text,
    };
    return this.request("post", api_method, payload);
  }
} // end class SlackAPI
