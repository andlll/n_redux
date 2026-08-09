/// gml_Object_upfaro3_Mouse_4
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(phase, 0, 0);
    if (__b__) {
        action_create_object(cc5000, 0, -50);
        action_set_relative(0);
        phase = 1;
        action_set_relative(1);
    } else {
        with (r12) {
            __b__ = action_if_variable(mon, 5000, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_set_relative(0);
            arm = 2;
            action_set_relative(1);
            with (r12) {
                mon = mon + -5000;
            }
            with (faro3) {
                action_set_relative(0);
                trasformato = 1;
                action_set_relative(1);
            }
            with (faro3) {
                action_sprite_set(f3, 0, 1);
            }
            action_effect(1, 0, -50, 1, 4259584, 0);
            action_kill_object();
        }
    }
}
with (r12) {
    action_set_relative(0);
    selec = 0;
    action_set_relative(1);
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 5000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_set_relative(0);
        arm = 2;
        action_set_relative(1);
        with (r12) {
            mon = mon + -5000;
        }
        with (faro3) {
            action_set_relative(0);
            trasformato = 1;
            action_set_relative(1);
        }
        with (faro3) {
            action_sprite_set(f3, 0, 1);
        }
        action_effect(1, 0, -50, 1, 4259584, 0);
        action_kill_object();
    }
}
action_set_relative(0);
