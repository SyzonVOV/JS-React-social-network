import { useEffect, useRef } from 'react';

export default function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    console.log(prev.current, props);
    prev.current = props;
  });
}

/*
componentDidUpdate(prevProps, prevState) {
  Object.entries(this.props).forEach(([key, val]) =>
    prevProps[key] !== val && console.log('Prop '${key}' changed')
);
  Object.entries(this.state).forEach(([key, val]) =>
    prevState[key] !== val && console.log('State '${key}' changed')
);
}*/
