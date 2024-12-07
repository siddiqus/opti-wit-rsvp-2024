import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import QuestionForm from "./components/QuestionForm";
import RsvpForm from "./components/RsvpForm";

import "./App.css"; // For styling
import WordCloud from "./components/WordCloud";

const HomePage = () => {
  return (
    <Router>
      <div className="container">
        <div
          style={{ color: "white", fontWeight: "bold", fontStyle: "italic" }}
        >
          Optimizely Presents:
        </div>
        <h1>Women in Tech</h1>
        <div style={{ color: "white", marginBottom: "20px" }}>
          Dec 8, Sunday 4:30 PM @ Optimizely Dhaka
        </div>

        <Switch>
          <Route exact path="/">
            <RsvpForm isOpen={true} />
          </Route>
          <Route exact path="/admin">
            <AdminHeader />
          </Route>
          <Route path="/questions/:id">
            <QuestionForm />
          </Route>

          <Route path="/admin/results/:id">
            <AdminHeader />
            <WordCloud />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;
