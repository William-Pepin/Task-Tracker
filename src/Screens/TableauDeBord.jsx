import React, { Component } from "react";
import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import * as Yup from "yup";
import Tasks from "../Components/Tasks";
import SubmitButton from "../Components/Forms/SubmitButton";

export default class TableauDeBord extends Component {
  state = {
    tasks: [
      {
        _id: 1,
        fait: false,
        title: "Faire de la nourriture pour la semaine",
        description: "Description de la tache",
        isFlagged: true,
        priority: false,
      },
      {
        _id: 2,
        fait: false,
        title: "Task 1",
        description: "Description de la tache",
        isFlagged: false,
        priority: true,
      },
      {
        _id: 3,
        fait: false,
        title: "Task 1",
        description: "Description de la tache",
        isFlagged: false,
        priority: true,
      },
      {
        _id: 4,
        completed: false,
        title: "Task 1",
        description: "Description de la tache",
        isFlagged: true,
        priority: true,
        isOpened: true,
      },
    ],
  };

  handleComplete = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task, completed: !task.completed };

    // Todo delay 5 sec et envoi a l'api ensuite
    this.setState({ tasks });
  };

  handlePriority = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task, priority: !task.priority };

    this.setState(tasks);
    // Todo api call
  };

  handleFlag = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task, isFlagged: !task.isFlagged };

    this.setState(tasks);
    // Todo api call
  };

  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });
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
  handleSubmit = (values, actions) => {
    const task = {
      _id: 5,
      title: values.title,
      description: values.description,
      completed: false,
      isFlagged: false,
      priority: false,
    };
    const tasks = [...this.state.tasks, task];

    this.setState({ tasks });
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
          <h6>William Pépin</h6>
          <label>Email</label>
          <p>William@gmail.com</p>
          <label>Mot de passe</label>
          <p>************</p>
          <Form
            initialValues={this.initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={this.validationSchema}
          >
            <Field name="nom" type="text" label="Nom" placeholder="William" />
            <Field
              name="prenom"
              type="text"
              label="Prénom"
              placeholder="Pépin"
            />
            <Field
              type="email"
              name="email"
              label={"Courriel"}
              placeholder="exemple@courriel.com"
            />
            <Field
              type="password"
              name="password"
              label={"Mot de passe"}
              placeholder="**************"
            />
            <Field
              type="password"
              name="confirmPassword"
              label={"Confirmez votre mot de passe"}
              placeholder="**************"
            />
            <button style={{ marginRight: "6px" }} className="btn btn-warning">
              Annuler
            </button>
            <SubmitButton title="Modifier" />
          </Form>
          <button style={{ marginTop: "6px" }} className="btn btn-danger">
            Modifier
          </button>
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
