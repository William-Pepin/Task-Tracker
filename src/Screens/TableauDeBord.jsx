import React, { Component } from "react";
import axios from "axios";
import * as taskService from "../Services/taskService";
import * as Yup from "yup";

import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import SubmitButton from "../Components/Forms/SubmitButton";
import UpdateAccountForm from "../Components/UpdateAccountForm";
import Tasks from "../Components/Tasks";

export default class TableauDeBord extends Component {
  state = {
    tasks: [],
    updateAccount: false,
  };
  async componentDidMount() {
    const response = await taskService.get();
    this.setState({ tasks: response.data.data.tasks });
  }

  handleComplete = (task) => {
    task.completed = !task.completed;
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task };

    // Todo delay 5 sec et envoi a l'api ensuite
    this.setState({ tasks });
    taskService.update(task);
  };

  handlePriority = (task) => {
    task.priority = !task.priority;
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task };

    this.setState(tasks);
    taskService.update(task);
  };

  handleFlag = (task) => {
    task.flagged = !task.flagged;
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task };

    this.setState(tasks);
    taskService.update(task);
  };

  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });

    taskService.del(task._id);
  };

  initialValues = {
    title: "",
    description: "",
    priority: false,
    flagged: false,
  };
  validationSchema = Yup.object().shape({
    title: Yup.string().required().max(127).label("Titre"),
    description: Yup.string().max(255).label("Description"),
  });

  handleSubmit = async (values, actions) => {
    const task = {
      title: values.title,
      description: values.description,
      completed: false,
      flagged: false,
      priority: false,
    };
    const tasks = [...this.state.tasks, task];

    this.setState({ tasks });
    try {
      const response = await taskService.post(task);
      task._id = response.data.data.task._id;
      tasks = [...this.state.tasks, task];
      this.setState({ tasks });
    } catch (e) {}
  };

  handleUpdateAccount = () => {
    const updateAccount = this.state.updateAccount;
    this.setState({ updateAccount: !updateAccount });
  };

  handleLogout = () => {
    window.location = "/logout";
  };

  render() {
    return (
      <div className="row" style={this.styles.container}>
        <div className="card col-xl-7 col-11 " style={this.styles.content}>
          <h3>Mes Tâches</h3>
          <Tasks
            tasks={this.state.tasks}
            onFlag={this.handleFlag}
            onPriority={this.handlePriority}
            onComplete={this.handleComplete}
            onDelete={this.handleDelete}
          ></Tasks>
        </div>
        <div className="card col-xl-4 col-11" style={this.styles.content}>
          <h3>Nouvelle tâche</h3>
          <Form
            initialValues={this.initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={this.validationSchema}
          >
            <Field
              name="title"
              type="text"
              label="Titre"
              placeholder="Entrez votre titre."
            />
            <Field
              name="description"
              type="text"
              label="Description"
              placeholder="Entrez votre description."
            />
            <SubmitButton title="Nouvelle tâche" />
          </Form>
          <hr />
          <h3>Mon compte</h3>
          {!this.state.updateAccount && (
            <div>
              <h6>
                {this.props.user.name} {this.props.user.surname}
              </h6>
              <label>Email</label>
              <p>{this.props.user.email}</p>
              <label>Mot de passe</label>
              <p>************</p>
              <button
                style={{ marginTop: "6px" }}
                className="btn btn-danger"
                onClick={this.handleLogout}
              >
                Déconnexion
              </button>
            </div>
          )}
          {this.state.updateAccount && (
            <div>
              <UpdateAccountForm user={this.user} />{" "}
              <button
                style={{ marginTop: "6px" }}
                className="btn btn-warning"
                onClick={this.handleUpdateAccount}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  styles = {
    container: {
      justifyContent: "center",
      display: "flex",
      padding: "1rem",
      margin: "auto",
    },
    content: {
      padding: "2rem",
      margin: "1rem",
    },
  };
}
