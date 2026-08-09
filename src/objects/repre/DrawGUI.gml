/// gml_Object_repre_Draw_64
// locals: __b__
__b__ = action_if_number(8, 0, 0);
if (__b__) {
    dpx = display_get_dpi_x();
    if (dpx > 200) {
        display_set_gui_maximise(2, 2, 0, 0);
    }
    if (dpx > 500) {
        display_set_gui_maximise(3, 3, 0, 0);
    }
    __b__ = action_if_variable(global.hc, 0, 0);
    if (__b__) {
        action_draw_sprite(icone_oriz, 0, 20 + global.upp, -1);
    }
    __b__ = action_if_variable(global.hc, 1, 0);
    if (__b__) {
        action_draw_sprite(icone_orizz_hc, 0, 20 + global.upp, -1);
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
    with (r12) {
        action_draw_variable(pop, 30, 30 + global.upp);
    }
    with (r12) {
        action_draw_variable(oil, 142, 30 + global.upp);
    }
    with (r12) {
        action_draw_variable(ele, 228, 30 + global.upp);
    }
    with (r12) {
        action_draw_variable(mon, 340, 30 + global.upp);
    }
    with (r12) {
        action_draw_variable(time, 448, 40 + global.upp);
    }
    __b__ = action_if_variable(mon, 1, 0);
    if (__b__) {
        action_draw_text("Jan", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 2, 0);
    if (__b__) {
        action_draw_text("Feb", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 3, 0);
    if (__b__) {
        action_draw_text("Mar", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 4, 0);
    if (__b__) {
        action_draw_text("Apr", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 5, 0);
    if (__b__) {
        action_draw_text("May", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 6, 0);
    if (__b__) {
        action_draw_text("Jun", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 7, 0);
    if (__b__) {
        action_draw_text("Jul", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 8, 0);
    if (__b__) {
        action_draw_text("Aug", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 9, 0);
    if (__b__) {
        action_draw_text("Sep", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 10, 0);
    if (__b__) {
        action_draw_text("Oct", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 11, 0);
    if (__b__) {
        action_draw_text("Nov", 456, 20 + global.upp);
    }
    __b__ = action_if_variable(mon, 12, 0);
    if (__b__) {
        action_draw_text("Dec", 456, 20 + global.upp);
    }
}
