/// gml_Object_scroller2_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(goer, 1, 0);
if (__b__) {
    __b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 1);
    if (__b__) {
        __b__ = action_if_variable(view_xview[0], 0, 4);
        if (__b__) {
            __b__ = action_if_variable(view_xview[0] + view_wview[0], 3900, 3);
            if (__b__) {
                __b__ = action_if_variable(view_yview[0], -200, 4);
                if (__b__) {
                    __b__ = action_if_variable(view_yview[0] + view_hview[0], 2090, 3);
                    if (__b__) {
                        __b__ = action_if_variable(os_type, 4, 0);
                        if (__b__) {
                            __b__ = action_if_mouse(1);
                            if (__b__) {
                                xshift = scroller2.x - mouse_x;
                                action_set_relative(1);
                                qq1.view_xview[view_xview[0] + xshift] = -1;
                                action_set_relative(0);
                                yshift = scroller2.y - mouse_y;
                                action_set_relative(1);
                                qq1.view_yview[view_yview[0] + yshift] = -1;
                                action_set_relative(0);
                            }
                        }
                    }
                }
            }
        }
    }
}
__b__ = action_if_variable(goer, 1, 0);
if (__b__) {
    __b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 1);
    if (__b__) {
        __b__ = action_if_variable(view_xview[0], 0, 4);
        if (__b__) {
            __b__ = action_if_variable(view_xview[0] + view_wview[0], 3900, 3);
            if (__b__) {
                __b__ = action_if_variable(view_yview[0], -200, 4);
                if (__b__) {
                    __b__ = action_if_variable(view_yview[0] + view_hview[0], 2090, 3);
                    if (__b__) {
                        __b__ = action_if_variable(os_type, 0, 0);
                        if (__b__) {
                            __b__ = action_if_mouse(2);
                            if (__b__) {
                                xshift = scroller2.x - mouse_x;
                                action_set_relative(1);
                                qq1.view_xview[view_xview[0] + xshift] = -1;
                                action_set_relative(0);
                                yshift = scroller2.y - mouse_y;
                                action_set_relative(1);
                                qq1.view_yview[view_yview[0] + yshift] = -1;
                                action_set_relative(0);
                            }
                        }
                    }
                }
            }
        }
    }
}
__b__ = action_if_number(160, 1, 0);
if (__b__) {
    __b__ = action_if_variable(view_xview[0] + view_wview[0], 3900, 2);
    if (__b__) {
        view_xview[0] = 3900 - view_wview[0];
    }
}
__b__ = action_if_number(162, 0, 0);
if (__b__) {
    __b__ = action_if_number(160, 0, 0);
    if (__b__) {
        __b__ = action_if_variable(view_xview[0] + view_wview[0], 1810, 2);
        if (__b__) {
            view_xview[0] = 1810 - view_wview[0];
        }
    }
}
__b__ = action_if_variable(view_xview[0], 0, 1);
if (__b__) {
    view_xview[0] = 0;
}
__b__ = action_if_number(161, 1, 0);
if (__b__) {
    __b__ = action_if_variable(view_yview[0] + view_hview[0], 2090, 2);
    if (__b__) {
        view_yview[0] = 2090 - view_hview[0];
    }
}
__b__ = action_if_number(161, 0, 0);
if (__b__) {
    __b__ = action_if_variable(view_yview[0] + view_hview[0], 1920, 2);
    if (__b__) {
        view_yview[0] = 1920 - view_hview[0];
    }
}
__b__ = action_if_variable(view_yview[0], -200, 1);
if (__b__) {
    view_yview[0] = -200;
}
__b__ = action_if_number(162, 1, 0);
if (__b__) {
    __b__ = action_if_variable(view_xview[0] + view_wview[0], 3900, 2);
    if (__b__) {
        view_xview[0] = 3900 - view_wview[0];
    }
}
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    __b__ = action_if_variable(view_yview[0] + view_hview[0], 1564, 2);
    if (__b__) {
        view_yview[0] = 1564 - view_hview[0];
    }
    __b__ = action_if_variable(view_xview[0] + view_wview[0], 1920, 2);
    if (__b__) {
        view_xview[0] = 1920 - view_wview[0];
    }
    __b__ = action_if_variable(view_yview[0], 0, 3);
    if (__b__) {
        view_yview[0] = 0;
    }
    __b__ = action_if_variable(view_xview[0], 0, 3);
    if (__b__) {
        view_xview[0] = 0;
    }
}
action_set_relative(0);
