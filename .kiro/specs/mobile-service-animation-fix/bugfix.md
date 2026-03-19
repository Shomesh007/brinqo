# Bugfix Requirements Document

## Introduction

The mobile service section in src/App.tsx has animation and scroll-based activation issues that prevent smooth transitions between service items. The bug manifests in three ways: a console warning about positioning context, abrupt color transitions that don't start early enough during scroll, and broken animation behavior that fails to provide seamless visual feedback as users navigate between service items on mobile devices.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the mobile service section is rendered THEN the system generates a console warning "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly"

1.2 WHEN scrolling from one service item to another on mobile THEN the system transitions colors abruptly without starting the transition when the next component is approximately 20% visible

1.3 WHEN the next service item becomes approximately 20% visible during scroll THEN the system does not initiate the background color transition early enough to create a smooth visual experience

1.4 WHEN scrolling between service items THEN the system's animation handling is broken and does not provide seamless transitions between active states

### Expected Behavior (Correct)

2.1 WHEN the mobile service section is rendered THEN the system SHALL render without any console warnings about positioning

2.2 WHEN scrolling from one service item to another on mobile THEN the system SHALL transition background colors smoothly with proper easing

2.3 WHEN the next service item becomes approximately 20% visible during scroll THEN the system SHALL initiate the background color transition to provide early visual feedback

2.4 WHEN scrolling between service items THEN the system SHALL handle animations seamlessly with smooth transitions between active states

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a service item is fully active (focal point within its bounds) THEN the system SHALL CONTINUE TO display the red background (#e73250) and cream text (#fcf9f2)

3.2 WHEN a service item is inactive THEN the system SHALL CONTINUE TO display transparent background and dark text (#1c1c18)

3.3 WHEN scrolling downward THEN the system SHALL CONTINUE TO use the 85% viewport height focal point for activation detection

3.4 WHEN scrolling upward THEN the system SHALL CONTINUE TO use the 15% viewport height focal point for activation detection

3.5 WHEN a service item is active THEN the system SHALL CONTINUE TO display all active state visual effects including the sweep gradient, glow radiance, pulsing dot, scaled title, and expanded description

3.6 WHEN on desktop viewport (md breakpoint and above) THEN the system SHALL CONTINUE TO display the grid-based ServiceIconBox layout instead of the mobile ServiceItem layout

3.7 WHEN the arrow icon is displayed THEN the system SHALL CONTINUE TO rotate from ArrowRight to ArrowDown when the item becomes active
