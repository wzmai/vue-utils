export default {
	methods: {
		$get(url, params) {
			let _this = this;
			return new Promise((resolve, reject) => {
				_this.$http.get(url, {
						params: params
					})
					.then(resp => {
						resolve(resp);
					})
					.catch(error => {
						reject(error);
					});
			});
		},

		$post(url, params) {
			let _this = this;
			return new Promise((resolve, reject) => {
				_this.$http.post(url, params)
					.then(resp => {
						resolve(resp);
					})
					.catch(error => {
						reject(error);
					});
			});
		},

		$hasRespError(resp) {
			return (resp.data && resp.data.success !== null && resp.data.success !== undefined && resp.data.success === false);
		},

		checkResp(resp, fn) {
			return new Promise((resolve, reject) => {
				if (fn && fn(resp)) {
					resolve(resp.data);
				} else {
					reject(resp.data);
				}
			});
		},

		procError(error, errAction) {
			if (error && error.Code === Number('-1000')) {
				// 未登录操作
				this.$error(error.Message);
				return true;
			} else if (error && error.response && error.response.status === 504) {
				this.$error("请求超时，请稍后再试");
				return true;
			} else if (error && error.response && error.response.status === 401) {
				this.$error("没有访问权限");
				return true;
			} else if (error && error.response && error.response.status === 500) {
				this.$error("服务器内部错误");
				return true;
			} else if (error && error.response && error.response.status === 404) {
				this.$error("地址错误");
				return true;
			} else if (this.$hasRespError(error)) {
				this.$error(error.message);
				return true;
			} else if (errAction) {
				this.$error(errAction);
				return true;
			} else if (error && error.Message) {
				this.$error(error.Message);
				return true;
			}
			return false;
		},

		$success(message) {
			if (message) this.$toast.success(message);
			else this.$toast.success('操作成功！');
		},

		$error(message) {
			this.$toast.fail(message);
		},

		showProgress(show) {
			if (show || show === null || show === undefined) {
				this.$toast.loading({
					message: '加载中',
					forbidClick: true,
					duration: 0
				});
			} else {
				this.$toast.clear();
			}
		}
	}
};
