import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true, // => you might need this when having the users in the app
    });
  }

  allProjects() {
    return this.service
      .get("/projects")
      .then((res) => res.data)
      .catch((err) => console.error(err));
  }

  singleProject(id) {
    return this.service
      .get(`/projects/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  }

  projectDelete(id) {
    return this.service
      .delete(`/projects/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  }
}

const service = new Service();

export default service;
