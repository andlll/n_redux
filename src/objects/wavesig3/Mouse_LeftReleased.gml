/// gml_Object_wavesig3_Mouse_7
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(phase, 0, 0);
    if (__b__) {
        action_create_object(ccc50, 0, 0);
        action_set_relative(0);
        phase = 1;
        action_set_relative(1);
    } else {
        with (aura) {
            __b__ = action_if_variable(night, 1, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(crys, 50, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_set_relative(0);
                action_create_object(farolux3, faro3.x, faro3.y);
                action_set_relative(1);
                with (r12) {
                    crys = crys + -50;
                }
                action_kill_object();
            }
        }
    }
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(crys, 50, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_set_relative(0);
            action_create_object(farolux3, faro3.x, faro3.y);
            action_set_relative(1);
            with (r12) {
                crys = crys + -50;
            }
            action_kill_object();
        }
    }
}
action_set_relative(0);
