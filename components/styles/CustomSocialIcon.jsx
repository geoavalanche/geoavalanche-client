const Radium = require('radium');
const React = require('react');
const SocialIcon = require('react-social-icons');

@Radium
class CustomSocialIcon extends React.Component {
  render() {
    return (
      <SocialIcon style={styles.icon} />
    );
  }
}

const styles = {
  icon: createIconStyle()
};

function createIconStyle() {
  return {
    ':hover': {
      transform: scale(1.1),
      boxShadow: '1px 1px 4px rgba(0,0,0,.5)'
    }
  }
}

module.exports = CustomSocialIcon;