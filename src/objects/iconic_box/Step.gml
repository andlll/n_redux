/// gml_Object_iconic_box_Step_0
// locals: __b__
__b__ = action_if_variable(global.hc, 1, 0);
if (__b__) {
    __b__ = action_if_number(734, 0, 2);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(crys, 0, 2);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            image_index = 1330;
        }
    }
    with (r12) {
        __b__ = action_if_variable(biotech, 0, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        image_index = 1330;
    }
    with (r12) {
        __b__ = action_if_variable(crys, 0, 3);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(biotech, 0, 3);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            sprite_index = 1329;
        }
    }
}
action_move_to(view_xview[0], view_yview[0] + 20 * global.sca + global.upp);
action_sprite_transform(global.sca, global.sca, 0, 0);
__b__ = action_if_variable(global.hc, 0, 0);
if (__b__) {
    sprite_index = 518;
}
