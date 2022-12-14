import React from "react";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

const PlaceYourOrder = () => {
  const initialValues = {
    username: "",
    email: "",
    number: "",
    deadline: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "!'Please Enter Your Name'";
    }
    if (!values.email) {
      errors.email = "!'Please Enter Your Email'";
    } else if (!regex.test(values.email)) {
      errors.email = "!'This is not Email Format'";
    }
    if (!values.number) {
      errors.number = "!'Please Enter Your Number'";
    } else if (values.number.length < 10) {
      errors.number = "!'Please Enter Correct Number'";
    } else if (values.number.length > 10) {
      errors.number = "!'Please Enter Correct Number'";
    }
    if (!values.deadline) {
      errors.deadline = "!'Please Enter Your deadline'";
    }
    return errors;
  };

  const initialValue = {
    username: "",
    email: "",
    subject: "",
    message: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [inSubmit, setInSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const btnSubmit = (e) => {
    e.preventDefault();
    setFormError(valide(formValue));
    setInSubmit(true);
  };

  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 && inSubmit) {
      console.log(formValue);
    }
  }, [formError]);

  const valide = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      error.username = "!'Please Enter Your Name'";
    }
    if (!values.email) {
      error.email = "!'Please Enter Your Email'";
    } else if (!regex.test(values.email)) {
      error.email = "!'This is not Email Format'";
    }
    if (!values.subject) {
      error.subject = "!'Please Enter Your Subject'";
    }
    if (!values.message) {
      error.message = "!'Please Enter Your Message'";
    }
    return error;
  };
  return (
    <div>
      <section className="place_sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="place_sec-h1 p-0">Place Your Order</h1>
            </div>

            <div className="col-md-6">
              <section className="form_sec">
                <form
                  style={{ padding: "4%" }}
                  className="text-center"
                  onSubmit={handleSubmit}
                >
                  <h2 className="form_sec-h2">
                    Get In <span className="spa">Touch </span>
                  </h2>
                  <div className="d-flex space-between">
                    <div className="Home-Name">
                      <input
                        type="text"
                        id="fname"
                        name="username"
                        placeholder="Name"
                        onChange={handleChange}
                        className="text_set ms-0"
                      />
                      <p style={{ color: "red" }}>{formErrors.username}</p>
                    </div>

                    <div className="Home-Name">
                      <input
                        type="text"
                        id="fname"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="text_set ms-0"
                      />
                      <p style={{ color: "red" }}>{formErrors.email}</p>
                    </div>
                  </div>
                  <div className="d-flex space-between">
                    <div className="Home-Name">
                      <input
                        type="number"
                        id="fname"
                        name="number"
                        placeholder="Exp:+91 7665092627"
                        onChange={handleChange}
                        className="text_set ms-0"
                      />
                      <p style={{ color: "red" }}>{formErrors.number}</p>
                    </div>
                    <div className="Home-Name">
                      <select className="text_set ms-0">
                        <option>Content Type</option>

                        <option>Ghost Writing</option>
                        <option>Blog Writing</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex space-between">
                    <div className="Home-Name">
                      <input
                        type="text"
                        id="fname"
                        name="deadline"
                        placeholder="Deadline"
                        onChange={handleChange}
                        className="text_set ms-0"
                      />
                      <p style={{ color: "red" }}>{formErrors.deadline}</p>
                    </div>

                    <div className="Home-Name">
                      <select className="text_set ms-0">
                        <option>Expert Level</option>

                        <option>Expert</option>
                        <option>Premium</option>
                        <option>Enterprice</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn_set1 ms-0">
                    Register
                  </button>{" "}
                  {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <h3 className="Success t-center" style={{ color: "#fff" }}>
                      Register is Successfull
                    </h3>
                  ) : (
                    ""
                  )}
                  {/* <Link to="/Login"><button type="button" className="btn_set2" onClick={(e) => this.create(e)}>Login</button></Link> */}
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center">
        <h2 className="writing_sec-h2">
          Content That You Can Get With GetProWriter
        </h2>
        <span className="writing_sec-spa">
          {" "}
          <i className="fa-solid fa-arrows-left-right"></i>{" "}
          <i className="fa-thin fa-horizontal-rule"></i>
        </span>
        <p className="writing_sec-p">
          GetProWriter is a website specifically designed to help you create
          content to attract and convert visitors into leads.
        </p>
      </div>

      <section className="place_Sec-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="form_h2">
                <span className="form_h2-span">Your</span> Question
              </h2>
              <form onSubmit={btnSubmit}>
                <input
                  type="text"
                  id="fname"
                  name="username"
                  placeholder="FullName"
                  onChange={handleChange}
                  className="ct_text-set"
                />
                <p style={{ color: "red" }}>{formError.username}</p>
                <input
                  type="text"
                  id="fname"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  className="ct_text-set"
                />
                <p style={{ color: "red" }}>{formError.email}</p>
                <input
                  type="text"
                  id="fname"
                  placeholder="Subject"
                  name="subject"
                  onChange={handleChange}
                  className="ct_text-set1"
                />
                <p style={{ color: "red" }}>{formError.subject}</p>
                <textarea
                  className="form-control form-area ct_text-set1"
                  rows="8"
                  onChange={handleChange}
                  id="message"
                  placeholder="Message"
                  name="message"
                ></textarea>
                <p style={{ color: "red" }}>{formError.message}</p>
                <button type="submit" className="ct_btn-set">
                  Submit
                </button>{" "}
                {Object.keys(formError).length === 0 && inSubmit ? (
                  <span className="Success">Submitted is Successfull</span>
                ) : (
                  ""
                )}
              </form>
            </div>

            <div className="col-md-6">
              <section className="faq_section accordion" id="accordionExample">
                <div className="faq-inner">
                  <div className="faq-item p-0 bg_set accordion-item">
                    <h2
                      className="faq_item-h3 p-0 accordion-header"
                      id="headingOne"
                    >
                      <button
                        className="faq-plus fs-5 fw-normal accordion-button bg-transparent text-white accordion-button shadow-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        + Why use a Content Writing Agency?
                      </button>
                    </h2>

                    <div
                      className="bg-white accordion-collapse collapse"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {" "}
                        The reason is straightforward: they understand how to
                        develop SEO-friendly, well-researched, and high-quality
                        content. They will supply a content writer who has prior
                        expertise and vast understanding in that sector. It will
                        also reduce your workload if you use their SEO content
                        writing services. So, what are you holding out for? Now
                        is the time to hire a content writer from Get Pro
                        Writer.
                      </div>
                    </div>
                  </div>

                  <div className="faq-item p-0 bg_set accordion-item">
                    <h2
                      className="faq_item-h3 p-0 accordion-header"
                      id="headingTwo"
                    >
                      <button
                        className="faq-plus fs-5 fw-normal accordion-button bg-transparent text-white accordion-button shadow-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        + Why should I hire a content writer?
                      </button>
                    </h2>

                    <div
                      className="bg-white accordion-collapse collapse"
                      id="collapseTwo"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {" "}
                        To obtain the best, highest quality, and SEO-friendly
                        content for different kind of content needs. A content
                        writer understands how to write for both humans and
                        machines, striking a great balance between the two
                        (which many fail).
                      </div>
                    </div>
                  </div>
                </div>

                <div className="faq-item p-0 bg_set accordion-item">
                  <h2
                    className="faq_item-h3 p-0 accordion-header"
                    id="headingThree"
                  >
                    <button
                      className="faq-plus fs-5 fw-normal accordion-button bg-transparent text-white accordion-button shadow-none collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      + Do I own the Content written by you?
                    </button>
                  </h2>

                  <div
                    className="bg-white accordion-collapse collapse"
                    id="collapseThree"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {" "}
                      Yes, you have absolute ownership after the content is
                      given by our end. You are free to modify it as you like.
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceYourOrder;
