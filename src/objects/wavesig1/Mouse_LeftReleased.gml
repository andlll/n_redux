/// gml_Object_wavesig1_Mouse_7
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(phase, 0, 0);
    if (__b__) {
        action_create_object(ccc20, 0, 0);
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
                __b__ = action_if_variable(crys, 20, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_set_relative(0);
                action_create_object(farolux, faro1.x, faro1.y);
                action_set_relative(1);
                action_create_object(farolux, faro2.x, faro2.y);
                with (r12) {
                    crys = crys + -20;
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
            __b__ = action_if_variable(crys, 20, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_set_relative(0);
            action_create_object(farolux, faro1.x, faro1.y);
            action_set_relative(1);
            action_create_object(farolux, faro2.x, faro2.y);
            with (r12) {
                crys = crys + -20;
            }
            action_kill_object();
        }
    }
}
action_set_relative(0);
