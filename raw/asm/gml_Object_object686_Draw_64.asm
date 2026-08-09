// gml_Object_object686_Draw_64  locals=2 args=0 len=1720
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E7118
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: push.imm.e 2
00000054: conv.i.v
00000058: call display_set_gui_maximise(argc=4)
00000060: popz
00000064: push.imm.e -1
00000068: conv.i.v
0000006C: push.imm.e 20
00000070: conv.i.v
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 1328
00000080: conv.i.v
00000084: call action_draw_sprite(argc=4)
0000008C: popz
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 2
0000009C: conv.i.v
000000A0: call action_font(argc=2)
000000A8: popz
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.global.v global.hc
000000C4: call action_if_variable(argc=3)
000000CC: pop.v.v local.__b__
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x21E71AC
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: call action_color(argc=1)
000000F4: popz
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.imm.e 1
00000104: conv.i.v
00000108: push.global.v global.hc
00000110: call action_if_variable(argc=3)
00000118: pop.v.v local.__b__
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21E71FC
00000130: push.i 16777215
00000138: conv.i.v
0000013C: call action_color(argc=1)
00000144: popz
00000148: push.imm.e 156
0000014C: pushenv 0x21E7228
00000150: push.imm.e 35
00000154: conv.i.v
00000158: push.imm.e 30
0000015C: conv.i.v
00000160: push.v pop
00000168: call action_draw_variable(argc=3)
00000170: popz
00000174: popenv 0x41E7204
00000178: push.imm.e 156
0000017C: pushenv 0x21E7258
00000180: push.imm.e 35
00000184: conv.i.v
00000188: push.imm.e 142
0000018C: conv.i.v
00000190: push.v oil
00000198: call action_draw_variable(argc=3)
000001A0: popz
000001A4: popenv 0x41E7234
000001A8: push.imm.e 156
000001AC: pushenv 0x21E7288
000001B0: push.imm.e 35
000001B4: conv.i.v
000001B8: push.imm.e 228
000001BC: conv.i.v
000001C0: push.v ele
000001C8: call action_draw_variable(argc=3)
000001D0: popz
000001D4: popenv 0x41E7264
000001D8: push.imm.e 156
000001DC: pushenv 0x21E72B8
000001E0: push.imm.e 35
000001E4: conv.i.v
000001E8: push.imm.e 340
000001EC: conv.i.v
000001F0: push.v mon
000001F8: call action_draw_variable(argc=3)
00000200: popz
00000204: popenv 0x41E7294
00000208: push.imm.e 156
0000020C: pushenv 0x21E72E8
00000210: push.imm.e 50
00000214: conv.i.v
00000218: push.imm.e 448
0000021C: conv.i.v
00000220: push.v time
00000228: call action_draw_variable(argc=3)
00000230: popz
00000234: popenv 0x41E72C4
00000238: push.imm.e 0
0000023C: conv.i.v
00000240: push.imm.e 1
00000244: conv.i.v
00000248: push.v mon
00000250: call action_if_variable(argc=3)
00000258: pop.v.v local.__b__
00000260: push.local.v local.__b__
00000268: conv.v.b
0000026C: bf 0x21E734C
00000270: push.imm.e 20
00000274: conv.i.v
00000278: push.imm.e 456
0000027C: conv.i.v
00000280: push.s "Jan"
00000288: conv.s.v
0000028C: call action_draw_text(argc=3)
00000294: popz
00000298: push.imm.e 0
0000029C: conv.i.v
000002A0: push.imm.e 2
000002A4: conv.i.v
000002A8: push.v mon
000002B0: call action_if_variable(argc=3)
000002B8: pop.v.v local.__b__
000002C0: push.local.v local.__b__
000002C8: conv.v.b
000002CC: bf 0x21E73AC
000002D0: push.imm.e 20
000002D4: conv.i.v
000002D8: push.imm.e 456
000002DC: conv.i.v
000002E0: push.s "Feb"
000002E8: conv.s.v
000002EC: call action_draw_text(argc=3)
000002F4: popz
000002F8: push.imm.e 0
000002FC: conv.i.v
00000300: push.imm.e 3
00000304: conv.i.v
00000308: push.v mon
00000310: call action_if_variable(argc=3)
00000318: pop.v.v local.__b__
00000320: push.local.v local.__b__
00000328: conv.v.b
0000032C: bf 0x21E740C
00000330: push.imm.e 20
00000334: conv.i.v
00000338: push.imm.e 456
0000033C: conv.i.v
00000340: push.s "Mar"
00000348: conv.s.v
0000034C: call action_draw_text(argc=3)
00000354: popz
00000358: push.imm.e 0
0000035C: conv.i.v
00000360: push.imm.e 4
00000364: conv.i.v
00000368: push.v mon
00000370: call action_if_variable(argc=3)
00000378: pop.v.v local.__b__
00000380: push.local.v local.__b__
00000388: conv.v.b
0000038C: bf 0x21E746C
00000390: push.imm.e 20
00000394: conv.i.v
00000398: push.imm.e 456
0000039C: conv.i.v
000003A0: push.s "Apr"
000003A8: conv.s.v
000003AC: call action_draw_text(argc=3)
000003B4: popz
000003B8: push.imm.e 0
000003BC: conv.i.v
000003C0: push.imm.e 5
000003C4: conv.i.v
000003C8: push.v mon
000003D0: call action_if_variable(argc=3)
000003D8: pop.v.v local.__b__
000003E0: push.local.v local.__b__
000003E8: conv.v.b
000003EC: bf 0x21E74CC
000003F0: push.imm.e 20
000003F4: conv.i.v
000003F8: push.imm.e 456
000003FC: conv.i.v
00000400: push.s "May"
00000408: conv.s.v
0000040C: call action_draw_text(argc=3)
00000414: popz
00000418: push.imm.e 0
0000041C: conv.i.v
00000420: push.imm.e 6
00000424: conv.i.v
00000428: push.v mon
00000430: call action_if_variable(argc=3)
00000438: pop.v.v local.__b__
00000440: push.local.v local.__b__
00000448: conv.v.b
0000044C: bf 0x21E752C
00000450: push.imm.e 20
00000454: conv.i.v
00000458: push.imm.e 456
0000045C: conv.i.v
00000460: push.s "Jun"
00000468: conv.s.v
0000046C: call action_draw_text(argc=3)
00000474: popz
00000478: push.imm.e 0
0000047C: conv.i.v
00000480: push.imm.e 7
00000484: conv.i.v
00000488: push.v mon
00000490: call action_if_variable(argc=3)
00000498: pop.v.v local.__b__
000004A0: push.local.v local.__b__
000004A8: conv.v.b
000004AC: bf 0x21E758C
000004B0: push.imm.e 20
000004B4: conv.i.v
000004B8: push.imm.e 456
000004BC: conv.i.v
000004C0: push.s "Jul"
000004C8: conv.s.v
000004CC: call action_draw_text(argc=3)
000004D4: popz
000004D8: push.imm.e 0
000004DC: conv.i.v
000004E0: push.imm.e 8
000004E4: conv.i.v
000004E8: push.v mon
000004F0: call action_if_variable(argc=3)
000004F8: pop.v.v local.__b__
00000500: push.local.v local.__b__
00000508: conv.v.b
0000050C: bf 0x21E75EC
00000510: push.imm.e 20
00000514: conv.i.v
00000518: push.imm.e 456
0000051C: conv.i.v
00000520: push.s "Aug"
00000528: conv.s.v
0000052C: call action_draw_text(argc=3)
00000534: popz
00000538: push.imm.e 0
0000053C: conv.i.v
00000540: push.imm.e 9
00000544: conv.i.v
00000548: push.v mon
00000550: call action_if_variable(argc=3)
00000558: pop.v.v local.__b__
00000560: push.local.v local.__b__
00000568: conv.v.b
0000056C: bf 0x21E764C
00000570: push.imm.e 20
00000574: conv.i.v
00000578: push.imm.e 456
0000057C: conv.i.v
00000580: push.s "Sep"
00000588: conv.s.v
0000058C: call action_draw_text(argc=3)
00000594: popz
00000598: push.imm.e 0
0000059C: conv.i.v
000005A0: push.imm.e 10
000005A4: conv.i.v
000005A8: push.v mon
000005B0: call action_if_variable(argc=3)
000005B8: pop.v.v local.__b__
000005C0: push.local.v local.__b__
000005C8: conv.v.b
000005CC: bf 0x21E76AC
000005D0: push.imm.e 20
000005D4: conv.i.v
000005D8: push.imm.e 456
000005DC: conv.i.v
000005E0: push.s "Oct"
000005E8: conv.s.v
000005EC: call action_draw_text(argc=3)
000005F4: popz
000005F8: push.imm.e 0
000005FC: conv.i.v
00000600: push.imm.e 11
00000604: conv.i.v
00000608: push.v mon
00000610: call action_if_variable(argc=3)
00000618: pop.v.v local.__b__
00000620: push.local.v local.__b__
00000628: conv.v.b
0000062C: bf 0x21E770C
00000630: push.imm.e 20
00000634: conv.i.v
00000638: push.imm.e 456
0000063C: conv.i.v
00000640: push.s "Nov"
00000648: conv.s.v
0000064C: call action_draw_text(argc=3)
00000654: popz
00000658: push.imm.e 0
0000065C: conv.i.v
00000660: push.imm.e 12
00000664: conv.i.v
00000668: push.v mon
00000670: call action_if_variable(argc=3)
00000678: pop.v.v local.__b__
00000680: push.local.v local.__b__
00000688: conv.v.b
0000068C: bf 0x21E776C
00000690: push.imm.e 20
00000694: conv.i.v
00000698: push.imm.e 456
0000069C: conv.i.v
000006A0: push.s "Dec"
000006A8: conv.s.v
000006AC: call action_draw_text(argc=3)
000006B4: popz