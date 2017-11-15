import audioPlayer from 'reducers/audioPlayer'

describe('Audioplayer reducer', () => {
  const expectedInitialState = {
    currentTrack: null,
    currentCard: null,
    trackType: null,
    trackTitle: null,
    trackCoverArt: null,
    soundCloudTrackLink: null,
    position: 0,
    duration: 0,
    volume: 100,
    shuffle: false,
    repeat: false,
    isFirstPlayback: true,
    mute: false,
    playMode: null,
    positionInPlaylist: null,
    isPlaying: false
  }

  it('has an initial state', () => {
    expect(audioPlayer(undefined, { type: 'unexpected' })).toEqual(expectedInitialState)
  })

  it('can handle TOGGLE_PLAY_SUCCESS', () => {
    const newPlayerState = {
      currentTrack: { id: 1 },
      soundCloudTrackLink: 'someLink',
      trackType: 'soundcloud',
      trackTitle: 'test',
      trackCoverArt: 'someOtherLink',
      currentCard: { id: 123 },
      isFirstPlayback: false,
      isPlaying: true,
      duration: 1000
    }
    const expectedState = { ...expectedInitialState, ...newPlayerState }

    expect(audioPlayer(undefined, { type: 'TOGGLE_PLAY_SUCCESS', newPlayerState })).toEqual(expectedState)
  })

  it('can handle TOGGLE_PLAYBACK_STATE', () => {
    const newPlayerState = {
      isPlaying: true
    }
    const expectedState = { ...expectedInitialState, ...newPlayerState }

    expect(audioPlayer(undefined, { type: 'TOGGLE_PLAYBACK_STATE_SUCCESS', newPlayerState })).toEqual(expectedState)
  })

  it('can handle STOP_TRACK_SUCCESS', () => {
    const newPlayerState = {
      isPlaying: false,
      position: 0
    }
    const expectedState = { ...expectedInitialState, ...newPlayerState }

    expect(audioPlayer(undefined, { type: 'STOP_TRACK_SUCCESS', newPlayerState })).toEqual(expectedState)
  })

  it('can handle TOGGLE_MUTE_SUCCESS', () => {
    const newPlayerState = {
      mute: true
    }
    const expectedState = { ...expectedInitialState, ...newPlayerState }

    expect(audioPlayer(undefined, { type: 'TOGGLE_MUTE_SUCCESS', newPlayerState })).toEqual(expectedState)
  })

  it('can handle POSITION_CHANGED_SUCCESS', () => {
    const params = { position: 10, duration: 100 }
    const expectedState = { ...expectedInitialState, ...params }

    expect(audioPlayer(undefined, { type: 'POSITION_CHANGED_SUCCESS', ...params })).toEqual(expectedState)
  })

  it('can handle CHANGE_POSITION_SUCCESS', () => {
    const params = { position: 10 }
    const expectedState = { ...expectedInitialState, ...params }

    expect(audioPlayer(undefined, { type: 'CHANGE_POSITION_SUCCESS', ...params })).toEqual(expectedState)
  })

  it('can handle CHANGE_VOLUME_SUCCESS', () => {
    const params = { volume: 10 }
    const expectedState = { ...expectedInitialState, ...params }

    expect(audioPlayer(undefined, { type: 'CHANGE_VOLUME_SUCCESS', ...params })).toEqual(expectedState)
  })
})
