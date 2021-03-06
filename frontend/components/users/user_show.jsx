import React from "react";
import UserTrackIndex from "./user_track_index_container";
import UserComment from "./user_comment_item";

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", id: null },
      comments: []
    };
  }

  componentDidMount() {
    this.props
      .fetchUserBy({ username: this.props.username })
      .then(res =>
        this.setState({
          user: res.users[0]
        })
      )
      .then(() => this.props.fetchTrackBy({ artist_id: this.state.user.id }))
      .then(res =>
        this.setState({
          tracks: res.tracks,
          loadedTracks: true
        })
      )
      .then(() => this.props.fetchComments({ author_id: this.state.user.id }))
      .then(res =>
        this.setState({
          comments: res.comments,
          comment_tracks: res.tracks
        })
      );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.user !== this.state.user.username) {
      this.props
        .fetchUserBy({ username: this.props.username })
        .then(res =>
          this.setState({
            user: res.users[0]
          })
        )
        .then(() => this.props.fetchTrackBy({ artist_id: this.state.user.id }))
        .then(res =>
          this.setState({
            tracks: res.tracks,
            loadedTracks: true
          })
        )
        .then(() => this.props.fetchComments({ author_id: this.state.user.id }))
        .then(res =>
          this.setState({
            comments: res.comments,
            comment_tracks: res.tracks
          })
        );
    }
  }

  handleDelete() {
    const userId = this.state.user.id;
    this.props.endSession().then(() => this.props.deleteUser(userId));
  }

  warning() {
    setTimeout(() => this.setState({ delete: null }), 4000);
    return this.state.user.username === "demo_user" ? (
      <h4>Nice try. But I can't let you delete the demo account.</h4>
    ) : (
      <div>
        <h4>Are you sure you want to delete your account?</h4>
        <div className="confirm-delete-buttons">
          <button className="confirm-yes" onClick={() => this.handleDelete()}>
            Yes
          </button>
          <button
            className="confirm-no"
            onClick={() => this.setState({ delete: false })}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  render() {
    const comments = this.state.comments.map(comment => (
      <UserComment
        key={comment.id}
        comment={comment}
        track={this.state.comment_tracks[comment.track_id]}
      />
    ));

    const s = comments.length === 1 ? "" : "s";

    return (
      <div className="content">
        <div className="user-content">
          <div className="user-banner">
            <img src={window.images.userIcons[this.state.user.imageId]} />
            <div className="banner-user-info">
              <h2>{this.state.user.username}</h2>
            </div>
          </div>

          <div className="user-body-header">
            <div className="user-headers">
              <h2>Tracks</h2>
            </div>

            <div className="user-buttons">
              {this.props.currentUser === this.state.user.id ? (
                this.state.delete ? (
                  <div className="confirm-delete-account">{this.warning()}</div>
                ) : (
                  <button onClick={() => this.setState({ delete: true })}>
                    Delete Account
                  </button>
                )
              ) : null}
            </div>
          </div>

          <div className="user-body">
            <div className="user-track-index">
              {this.state.loadedTracks ? (
                <UserTrackIndex tracks={this.state.tracks} />
              ) : null}
            </div>

            <div className="user-sidebar">
              <h4>
                <div />
                {`${comments.length} comment${s}`}
              </h4>
              <ul className="user-comments">{comments.reverse()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserShow;
