/// gml_Object_industria2_Step_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(upo, 0, 0);
if (__b__) {
    __b__ = action_if_variable(makee, 1000, 4);
    if (__b__) {
        action_create_object(upind23, 0, 0);
        action_set_relative(0);
        upo = 1;
        action_set_relative(1);
    }
}
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    action_create_object(updeathind2, 0, 0);
    action_create_object(ruin2, 0, 0);
    action_kill_object();
}
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
        action_set_relative(0);
        redder = 0;
        action_set_relative(1);
    }
}
__b__ = action_if_number(127, 1, 0);
if (__b__) {
    __b__ = action_if_variable(redder, 1, 0);
    if (__b__) {
        action_sprite_color(255, 1);
    }
}
action_set_relative(0);
