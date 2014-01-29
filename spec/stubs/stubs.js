exports.Request = function(url, method, postdata) {
  this.url = url;
  this.method = method;
  this._postData = postdata;
  this.setEncoding = function(type) {
    //ignore
  };
  var self = this;
  this.addListener = this.on = function(type, callback) {
    if (type == "data") {
      // turn postdata (dictionary object) into raw postdata
      // raw postdata looks like this:
      // username=jono&message=do+my+bidding
      var fields = [];
      for (var key in self._postData) {
        fields.push(key + "=" + self._postData[key].replace(" ", "+"));
      }
      callback(fields.join("&"));
    }
    if (type == "end") {
      callback();
    }
  };
};

exports.Response = function() {
  this._ended = false;
  this._responseCode = null;
  this._headers = null;
  this._data = null;
  var self = this;
  this.writeHead = function(responseCode, headers) {
    console.log("WriteHead called with " + responseCode);
    self._responseCode = responseCode;
    self._headers = headers;
  }
  this.end = function(data) {
    console.log("Response.end called.");
    self._ended = true;
    self._data = data;
  }
};
