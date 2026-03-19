import React, { useState, useEffect, useRef } from 'react';
import './MobileHero.css';

const steps = [
  {
    word: 'BUILD',
    sub: 'Websites, apps & digital products',
    icon: (animate: boolean) => <div className={`icon-build ${animate ? 'animate' : ''}`}></div>,
    platforms: null
  },
  {
    word: 'BRAND',
    sub: 'Identity, marketing & positioning',
    icon: (animate: boolean) => (
      <div className={`icon-brand ${animate ? 'animate' : ''}`}>
        <div className="b-bar"></div>
        <div className="b-bar"></div>
        <div className="b-bar"></div>
        <div className="b-bar"></div>
      </div>
    ),
    platforms: null
  },
  {
    word: 'BRIDGE',
    sub: 'Connecting you to the world',
    icon: (animate: boolean) => (
      <div className={`icon-bridge ${animate ? 'animate' : ''}`}>
        <div className="nd"></div><div className="nd"></div><div className="nd"></div>
        <div className="nl"></div><div className="nl"></div>
      </div>
    ),
    platforms: [
      { label: 'Search' },
      { label: 'Meta' },
      { label: 'Instagram' }
    ]
  }
];

const MobileHero: React.FC = () => {
  const [cur, setCur] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animateState, setAnimateState] = useState({
    weText: false,
    bigWord: false,
    wordIcon: false,
    redLine: false,
    subText: false,
    platforms: false,
    finalWrap: false
  });
  const [isReplayShow, setIsReplayShow] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);

  const T = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const hideStep = (cb: () => void) => {
    setAnimateState(prev => ({
      ...prev,
      weText: false,
      bigWord: false,
      redLine: false,
      subText: false,
      platforms: false
    }));
    T(cb, 300);
  };

  const startStep = (i: number) => {
    const step = steps[i];
    setProgress(((i + 1) / (steps.length + 1)) * 100);

    // Animate in sequence
    T(() => setAnimateState(prev => ({ ...prev, weText: true })), 50);
    T(() => setAnimateState(prev => ({ ...prev, bigWord: true })), 180);
    T(() => setAnimateState(prev => ({ ...prev, wordIcon: true })), 280);
    T(() => setAnimateState(prev => ({ ...prev, redLine: true })), 300);
    T(() => setAnimateState(prev => ({ ...prev, subText: true })), 400);
    if (step.platforms) {
      T(() => setAnimateState(prev => ({ ...prev, platforms: true })), 600);
    }

    // Auto advance
    const holdTime = step.platforms ? 2000 : 1800;
    T(() => {
      hideStep(() => {
        if (i + 1 < steps.length) {
          setCur(i + 1);
          startStep(i + 1);
        } else {
          showFinalState();
        }
      });
    }, holdTime);
  };

  const showFinalState = () => {
    setProgress(100);
    setShowFinal(true);
    T(() => setAnimateState(prev => ({ ...prev, finalWrap: true })), 50);
    T(() => setIsReplayShow(true), 800);
  };

  const init = () => {
    clearAll();
    setCur(0);
    setProgress(0);
    setShowFinal(false);
    setAnimateState({
      weText: false,
      bigWord: false,
      wordIcon: false,
      redLine: false,
      subText: false,
      platforms: false,
      finalWrap: false
    });
    setIsReplayShow(false);
    T(() => startStep(0), 800);
  };

  useEffect(() => {
    init();
    return () => clearAll();
  }, []);

  const currentStep = steps[cur];

  return (
    <div className="mobile-hero-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      
      <div className="screen">
        <div className="stage">
          {!showFinal ? (
            <>
              <div className={`we-text ${animateState.weText ? 'show' : ''}`}>We</div>

              <div className={`big-word ${animateState.bigWord ? 'show' : ''}`}>
                <span>{currentStep.word}</span>
                <span className={`word-icon ${animateState.wordIcon ? 'show' : ''}`}>
                  {currentStep.icon(animateState.wordIcon)}
                </span>
              </div>

              <div className={`red-line ${animateState.redLine ? 'show' : ''}`}></div>
              <div className={`sub-text ${animateState.subText ? 'show' : ''}`} dangerouslySetInnerHTML={{ __html: currentStep.sub }}></div>
              <div className={`platforms ${animateState.platforms ? 'show' : ''}`}>
                {currentStep.platforms?.map((p, idx) => (
                  <div key={idx} className="plat-tag">
                    <div className="plat-dot"></div>
                    {p.label}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={`final-wrap ${animateState.finalWrap ? 'show' : ''}`}>
              <div className="final-headline">
                We are<br />
                <span className="highlight">Brinqo</span><span className="b3-tag">b<sup>3</sup></span>
              </div>
              <div className="final-sub">
                <em>Build.</em> Brand. Bridge.<br />Your growth starts here.
              </div>
              <button className="cta-btn">Start Your Journey →</button><br />
              <span className="verticals"><span>•</span> SOFTWARE &nbsp;<span>•</span> MARKETING &nbsp;<span>•</span> DELIVERY</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MobileHero;
