// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    this.users[this.currentID] = { id: this.currentID, name: name };
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2);
      return true;
    }
    return false;
  }

  getFollows(userID) {
    const follows = {};
    this.follows[userID].forEach((followedID) => {
      follows[followedID] = true;
    });
    return follows;
  }

  getFollowers(userID) {
    const followers = new Set();
    Object.keys(this.follows).forEach((followerID) => {
      if (this.follows[followerID].has(userID)) {
        followers.add(parseInt(followerID));
      }
    });
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let recommended = new Set();
    let visited = new Set([userID]); // Mark the starting user as visited
    let current = new Set(this.follows[userID]); // Start with direct follows
    visited = new Set([...visited, ...current]); // Mark direct follows as visited so they are not recommended immediately

    for (let i = 0; i < degrees; i++) {
      let next = new Set();
      for (let id of current) {
        for (let followedID of this.follows[id]) {
          if (!visited.has(followedID)) {
            visited.add(followedID); // Mark as visited
            next.add(followedID); // Queue for next degree
            recommended.add(followedID); // Recommend this user
          }
        }
      }
      current = next; // Move to the next degree
    }

    return Array.from(recommended);
  }
}

module.exports = SocialNetwork;