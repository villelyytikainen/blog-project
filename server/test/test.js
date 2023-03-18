const Post = require("../models/Post");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.should();

chai.use(chaiHttp);

describe("posts", () => {
    beforeEach((done) => {
        Post.deleteMany({});
        done()
    });
    describe("/GET post", () => {
        it("it should GET all the posts", (done) => {
            chai
                .request(app)
                .get("/api/posts")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe("/POST post", () => {
        it("it should new POST a post", (done) => {
            let post = {
                title: "This is the first post",
                body: "This is a post post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            };
            chai
                .request(app)
                .post("/api/posts")
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("object");
                    res.body.status.should.be.eql("success");
                    done();
                });
        });
    });
    describe("/GET/:id Post", () => {
        it("it should GET a post by the id", (done) => {
            let post = new Post({
                title: "This is the first post",
                body: "This is a post post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            });
            post.save((err, post) => {
                chai
                    .request(app)
                    .get("/api/posts/" + post.id)
                    .send(post)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql("success");
                        done();
                    });
            });
        });
    });
    describe("/PUT/:id post", () => {
        it("it should UPDATE a post given the id", (done) => {
            let post = new Post({
                title: "This is the first post",
                body: "This is a post post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            });
            post.save((err, post) => {
                console.log(post.id);
                chai
                    .request(app)
                    .put("/api/posts/" + post.id)
                    .send({
                        title: "The first post was updated",
                        body: "This is a post post",
                        image:
                            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql("success");
                        done();
                    });
            });
        });
    });
    describe("/DELETE/:id post", () => {
        it("it should DELETE a post given the id", (done) => {
            let post = new Post({
                title: "This is the first post",
                body: "This is a post post",
                image:
                    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            });
            post.save((err, post) => {
                chai
                    .request(app)
                    .delete("/api/posts/" + post.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql("success");
                        done();
                    });
            });
        });
    });
});