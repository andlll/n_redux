/// gml_Object_m3cant_Step_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(redder, 0, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_color(16366009, 1);
    }
    with (aura) {
        __b__ = action_if_variable(dawn, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_color(15201023, 1);
    }
    with (aura) {
        __b__ = action_if_variable(dawn, 0, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (aura) {
            __b__ = action_if_variable(night, 0, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_sprite_color(16777215, 1);
        }
    }
    depth = -y + 1;
} else {
    action_sprite_color(0, 0.4);
}
__b__ = action_if_variable(phase, 14, 1);
if (__b__) {
    with (playbuttoner) {
        __b__ = action_if_variable(play, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            ele = ele + -5;
        }
        with (r12) {
            mon = mon + -5;
        }
    }
}
__b__ = action_if_variable(phase, 14, 4);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(spy, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(0);
            spy = 0;
            action_set_relative(1);
        }
    }
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            ele = ele + -2;
        }
    } else {
        with (r12) {
            ele = ele + -1;
        }
    }
}
action_set_relative(0);
