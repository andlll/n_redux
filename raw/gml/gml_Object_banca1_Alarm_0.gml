/// gml_Object_banca1_Alarm_0
// locals: __b__
action_set_alarm(10, 1);
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(255, 1);
    } else {
        action_sprite_color(16744448, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(65535, 1);
    } else {
        action_sprite_color(4259584, 1);
    }
}
__b__ = action_if_dice(2);
if (__b__) {
    action_set_alarm(120, 0);
} else {
    action_set_alarm(150, 0);
}
depth = -y;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c112, 0, 1);
            } else {
                action_sprite_set(c113, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c114, 0, 1);
            } else {
                action_sprite_set(c121, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c122, 0, 1);
            } else {
                action_sprite_set(c123, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c124, 0, 1);
            } else {
                action_sprite_set(c131, 0, 1);
            }
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c132, 0, 1);
            } else {
                action_sprite_set(c133, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c134, 0, 1);
            } else {
                action_sprite_set(c141, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c142, 0, 1);
            } else {
                action_sprite_set(c143, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(c144, 0, 1);
            } else {
                exit;
            }
        }
    }
}
