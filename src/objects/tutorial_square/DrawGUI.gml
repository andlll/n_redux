/// gml_Object_tutorial_square_Draw_64
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
    draw_set_font(gotham_mobile);
    draw_set_alpha(0.7);
    if (os_type == 0) {
        if (view_wview[0] <= 1800) {
            draw_roundrect_colour_ext(30, view_hview[0] * 1 / global.sca - 300, view_wview[0] * 1 / global.sca - 30, view_hview[0] * 1 / global.sca - 200, 30, 30, 16777215, 16777215, 0);
        } else {
            draw_roundrect_colour_ext(30, view_hview[0] * 1 / global.sca - 300, 1770, view_hview[0] * 1 / global.sca - 200, 30, 30, 16777215, 16777215, 0);
        }
    }
    if (os_type == 4) {
        draw_roundrect_colour_ext(30, view_hview[0] * 1 / global.sca - 300 - went, view_wview[0] * 1 / global.sca - 30, view_hview[0] * 1 / global.sca - 200, 30, 30, 16777215, 16777215, 0);
    }
    draw_set_alpha(1);
    if (phase == 0) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Damn! It looks like they destroyed half of the city! As new mayor you must rebuild it before they come back!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 1) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "First off, you should demolish those ruins, so that we can build new houses there.", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 2) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Select the scraper shaped button then click on the ruins to delete them!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 3) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "When you're about to delete a ruin the cost of the operation appears over it!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 4) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Building and deleting cost money, of course. You also have to pay for the scaffoldings while the operation is going!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 5) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "We collect money by taxing the citizens. You can collect taxes by hoovering with the mouse over those blue icons!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 6) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "When you collect taxes you can see your money amount going up. The top bar gives you in general the amount of resources you own.", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 7) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "The bottom bar instead is the Actions Bar. Use the hand button to select items", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 8) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "The button next to it is the Build button. Now select it and then select the house button, the first one!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 9) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Now build five houses in five empty spots! We need to boost the population in those times of war!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 10) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "When a house is completed immediately the population grows, but also the energy consumption! Houses' population keeps growing over time", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 11) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "To provide energy to the city we use power plants. If the energy drops below zero, our citizens will stop paying taxes!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 12) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Now build a power plant in an empty spot! Remember that energy consumption depends on population, so it will grow continuously", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 13) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "We also need to provide some clean air and amusement to them, and to do so you can build parks", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 14) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Notice that the more the population and power plants grow the more they will need parks!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 15) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Also notice that at night buildings consume much more energy!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 16) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Now build a park in an empty spot. Remember that parks are cheap and fast to build but very expensive in manteinance!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 17) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "If you have enough parks you will see an happy face next to the resources count, otherwise yes, they will stop paying taxes!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 18) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "The defense of the city is another crucial point. As you can see we use massive artillery to keep the city safe!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 19) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Build a rocket launcher in an empty spot. Remember that you can't build them too close at it would be too dangerous!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 20) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "We use weapons also to gather resources from our enemy, that carry them in those huge balloons you see flying above us!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 21) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Yes, I know what you are thinking and yes, NIMBUS grew stealing oil to foreign nations, but what can you do?", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 22) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "When a balloon is aproaching, click to the closest weapon to destroy it, then quickly collect the resource falling from the sky!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 23) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Green balloons are the ones carrying oil. They are the most common ones!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 24) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Power plants and the city's engines burn oil to run. The more the city weights the more consumes oil!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 25) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "So remember not to build unnecessary stuff or too many power plants or the city will fall to the ground!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 26) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Yellow balloons carry batteries for energy and blue ones carry money deposits.", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 27) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Red balloons are sent by the enemy to spy on us, so you absolutely have to destroy them!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 28) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "If you don't do it they will call reinforcements and you will experience an attack like the one you saw before!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 29) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "I think they will not stop until we build something very big to demonstrate them we belong here!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 30) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "In some time your city will become bigger and it will be difficult to control it all in a glance!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 31) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "You can use the view buttons to quickly see the new zones you'll build and to zoom in and out!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
    if (phase == 32) {
        if (os_type == 0) {
            draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "You can also use the right mouse button to move the view and the mouse wheel for the zoom controls!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
        }
        if (os_type == 4) {
            draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "You can also swipe with your finger to move the view of the map!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
        }
    }
    if (phase == 33) {
        draw_text_ext_colour(50, view_hview[0] * 1 / global.sca - 280 - went, "Well, it looks like you know how to move around now! Good luck with your own NIMBUS platform!", 30, view_wview[0] * 1 / global.sca - 80, 0, 0, 0, 0, 1);
    }
}
