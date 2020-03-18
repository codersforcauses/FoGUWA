export const uwaMapSettings = {
  gestureHandling: 'greedy',
  // Disable steet view
  streetViewControl: false,
  // Map type options
  mapTypeId: 'roadmap',
  // Map UI controls
  mapTypeControl: false,
  fullscreenControl: false,
  // Custom styling
  styles: [
    {
      elementType: 'geometry',
      stylers: [
        {
          // building
          color: '#E0E8E2'
        }
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        {
          // change this to on to show places name and marker
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#523735'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f1e6'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#c9b2a6'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#dcd2be'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ae9e90'
        }
      ]
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
        {
          // surrounding land
          color: '#F3F3F0'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          // land background
          // color: '#CEC4B7' light brown
          color: '#B1D3C3'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#93817c'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          // main greenery
          color: '#1b998b'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#447530'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          // minor road
          color: '#b1b098'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          // medium road
          color: '#b1b098'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          // major road
          color: '#b1b098'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e98d58'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#db8555'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#806b63'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#bcf4f5'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#92998d'
        }
      ]
    }
  ]
}
