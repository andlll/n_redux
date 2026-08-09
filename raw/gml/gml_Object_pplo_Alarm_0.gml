/// gml_Object_pplo_Alarm_0
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_motion(30, 0.5);
    } else {
        action_set_motion(330, 0.5);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_motion(150, 0.5);
    } else {
        action_set_motion(210, 0.5);
    }
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_alarm(58, 0);
    } else {
        action_set_alarm(73, 0);
    }
} else {
    action_set_alarm(36, 0);
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_alarm(83, 0);
    }
}
