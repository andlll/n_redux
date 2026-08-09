/// gml_Object_upsign12_Mouse_4
// locals: __b__
action_set_relative(0);
with (r12) {
    selec = 0;
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 500, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(upmasked, 0, 1);
        arm = 2;
        with (r12) {
            action_set_relative(1);
            mon = mon + -500;
            action_set_relative(0);
        }
        action_set_relative(1);
        action_effect(1, 0, -50, 1, 3989790, 0);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(impa1to2r, 0, 0);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(updeath12_luci, 0, 0);
        action_set_relative(0);
        action_kill_object();
    }
}
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(phase, 0, 0);
    if (__b__) {
        action_set_relative(1);
        action_create_object(cc500, 0, -50);
        action_set_relative(0);
        phase = 1;
    } else {
        with (r12) {
            __b__ = action_if_variable(mon, 500, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_sprite_set(upmasked, 0, 1);
            arm = 2;
            with (r12) {
                action_set_relative(1);
                mon = mon + -500;
                action_set_relative(0);
            }
            action_set_relative(1);
            action_effect(1, 0, -50, 1, 3989790, 0);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(impa1to2r, 0, 0);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(updeath12_luci, 0, 0);
            action_set_relative(0);
            action_kill_object();
        }
    }
}
action_set_relative(0);
