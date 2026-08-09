/// gml_Object_hapware_Step_0
// locals: __b__
proto1 = window_get_width();
proto2 = window_get_height();
if (proto1 > proto2) {
    global.upp = 0;
} else {
    global.upp = 0;
}
action_sprite_transform(global.sca * 0.62, global.sca * 0.62, 0, 0);
action_move_to(view_xview[0] + 520 * global.sca, view_yview[0] + 42 * global.sca + global.upp);
__b__ = action_if_variable(global.hc, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(hap, pop, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(hap3, 0, 1);
    }
    with (r12) {
        __b__ = action_if_variable(hap, pop, 4);
        if (!__b__) {
            break;
        }
    }
    if (!__b__) {
        action_sprite_set(hap1, 0, 1);
    }
}
__b__ = action_if_variable(global.hc, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(hap, pop, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(hap3hc, 0, 1);
    }
    with (r12) {
        __b__ = action_if_variable(hap, pop, 4);
        if (!__b__) {
            break;
        }
    }
    if (!__b__) {
        action_sprite_set(hap1hc, 0, 1);
    }
}
with (r12) {
    __b__ = action_if_variable(oil, 0, 3);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_number(736, 0, 0);
    if (__b__) {
        action_kill_object();
    }
}
__b__ = action_if_number(8, 0, 2);
if (__b__) {
    sprite_index = 518;
}
