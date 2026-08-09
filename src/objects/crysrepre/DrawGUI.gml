/// gml_Object_crysrepre_Draw_64
// locals: __b__
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    display_set_gui_maximise(2, 2, 0, 0);
}
action_font(gotham_mini, 0);
__b__ = action_if_variable(global.hc, 0, 0);
if (__b__) {
    action_color(0);
}
__b__ = action_if_variable(global.hc, 1, 0);
if (__b__) {
    action_color(16777215);
}
with (crysmenu) {
    __b__ = action_if_variable(cambiato, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        action_draw_variable(crys, 40, 85 + global.upp);
    }
}
with (crysmenu) {
    __b__ = action_if_variable(cambiato, 3, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_number(483, 0, 0);
    if (__b__) {
        with (r12) {
            action_draw_variable(biotech, 40, 85 + global.upp);
        }
    }
}
