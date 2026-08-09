/// gml_Object_iconic_box_Mouse_10
// locals: __b__
global.hc = 1;
__b__ = action_if_number(734, 0, 2);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(crys, 0, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        sprite_index = 1330;
    }
}
with (r12) {
    __b__ = action_if_variable(biotech, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    sprite_index = 1330;
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
__b__ = action_if_number(730, 0, 2);
if (__b__) {
    with (tutorial_thumb) {
        action_sprite_set(tut_ok_hc, 0, 1);
    }
}
