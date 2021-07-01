class HttpService {
  getFilteredWord = () => {
    const promis = new Promise((resolve, reject) => {
      fetch("http://localhost:3005/").then((response) => {
        resolve(response.json());
      });
    });
    return promis;
  };
}

export default HttpService;
