import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { buildAudioTrack } from 'utils/audioTrackBuilder'
import { togglePlay, positionChanged, nextTrack, previousTrack } from 'actions/audioPlayer'
import { createClick } from 'actions/cards/clicks'
import AudioPlayer from 'utils/audioPlayer'
import AudioToggleButtonComponent from 'components/ui/AudioToggleButton'

class AudioToggleButton extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    audioData: PropTypes.object,
    playerState: PropTypes.object.isRequired,
    togglePlay: PropTypes.func.isRequired,
    positionChanged: PropTypes.func.isRequired,
    previousTrack: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    createClick: PropTypes.func.isRequired,
    image: PropTypes.object,
    source: PropTypes.string,
    username: PropTypes.string
  }

  handleAudioToggle = () => {
    const {
      handleClickCreate,
      props: {
        card,
        audioData,
        image,
        togglePlay,
        positionChanged,
        previousTrack,
        nextTrack,
        playerState,
        source,
        username
      }
    } = this

    if (!audioData || !audioData.id) { return }
    const audioTrack = buildAudioTrack(card, image, audioData, source, username)

    if (playerState.isFirstPlayback) {
      const player = new AudioPlayer()
      const callbacks = {
        whileplaying: this.handlePositionChange(positionChanged),
        nextTrack,
        previousTrack,
        handleClickCreate
      }

      player.fixMobilePlayback()
      player.setCallbacks(callbacks)
    }

    togglePlay(audioTrack)
  }

  handlePositionChange = (f) => function() {
    f(this.position, this.duration)
  }

  handleClickCreate = (card, source) => {
    this.props.createClick({ card, source })
  }

  render() {
    const { props: { audioData, playerState }, handleAudioToggle } = this
    const isPlaying = audioData && playerState.isPlaying && playerState.currentTrack.id === audioData.id
    const props = {
      handleAudioToggle,
      isPlaying
    }

    return <AudioToggleButtonComponent {...props} />
  }
}

const mapDispatchToProps = { togglePlay, positionChanged, previousTrack, nextTrack, createClick }

const mapStateToProps = (state) => ({
  playerState: state.player
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioToggleButton)
