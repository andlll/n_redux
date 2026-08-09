/// gml_Object_pplo_Create_0
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
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(q2, 0, 1);
            } else {
                action_sprite_set(q3, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(q4, 0, 1);
            } else {
                action_sprite_set(q5, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(q6, 0, 1);
            } else {
                action_sprite_set(q7, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(q10, 0, 1);
            } else {
                action_sprite_set(q1, 0, 1);
            }
        }
    }
}
