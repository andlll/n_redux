/// gml_Object_eoli_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_number(127, 0, 0);
if (__b__) {
    __b__ = action_if_variable(redder, 1, 0);
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
        redder = 0;
    }
}
__b__ = action_if_number(127, 1, 0);
if (__b__) {
    __b__ = action_if_variable(redder, 1, 0);
    if (__b__) {
        action_sprite_color(255, 1);
    }
}
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    action_set_relative(1);
    action_create_object(ruinventola, 0, 0);
    action_set_relative(0);
    action_kill_object();
}
action_set_relative(0);
