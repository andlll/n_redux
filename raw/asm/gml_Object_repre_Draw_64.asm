// gml_Object_repre_Draw_64  locals=2 args=0 len=2128
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 8
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E6AA8
00000038: call display_get_dpi_x(argc=0)
00000040: pop.v.v dpx
00000048: push.v dpx
00000050: push.imm.e 200
00000054: cmp.i.v >
00000058: bf 0x21E62E0
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 2
00000070: conv.i.v
00000074: push.imm.e 2
00000078: conv.i.v
0000007C: call display_set_gui_maximise(argc=4)
00000084: popz
00000088: push.v dpx
00000090: push.imm.e 500
00000094: cmp.i.v >
00000098: bf 0x21E6320
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 3
000000B0: conv.i.v
000000B4: push.imm.e 3
000000B8: conv.i.v
000000BC: call display_set_gui_maximise(argc=4)
000000C4: popz
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.global.v global.hc
000000E0: call action_if_variable(argc=3)
000000E8: pop.v.v local.__b__
000000F0: push.local.v local.__b__
000000F8: conv.v.b
000000FC: bf 0x21E638C
00000100: push.imm.e -1
00000104: conv.i.v
00000108: push.imm.e 20
0000010C: push.global.v global.upp
00000114: add.v.i
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: push.imm.e 1328
00000124: conv.i.v
00000128: call action_draw_sprite(argc=4)
00000130: popz
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 1
00000140: conv.i.v
00000144: push.global.v global.hc
0000014C: call action_if_variable(argc=3)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x21E63F8
0000016C: push.imm.e -1
00000170: conv.i.v
00000174: push.imm.e 20
00000178: push.global.v global.upp
00000180: add.v.i
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 1331
00000190: conv.i.v
00000194: call action_draw_sprite(argc=4)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 2
000001AC: conv.i.v
000001B0: call action_font(argc=2)
000001B8: popz
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: push.global.v global.hc
000001D4: call action_if_variable(argc=3)
000001DC: pop.v.v local.__b__
000001E4: push.local.v local.__b__
000001EC: conv.v.b
000001F0: bf 0x21E6460
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: call action_color(argc=1)
00000204: popz
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e 1
00000214: conv.i.v
00000218: push.global.v global.hc
00000220: call action_if_variable(argc=3)
00000228: pop.v.v local.__b__
00000230: push.local.v local.__b__
00000238: conv.v.b
0000023C: bf 0x21E64B0
00000240: push.i 16777215
00000248: conv.i.v
0000024C: call action_color(argc=1)
00000254: popz
00000258: push.imm.e 156
0000025C: pushenv 0x21E64E4
00000260: push.imm.e 30
00000264: push.global.v global.upp
0000026C: add.v.i
00000270: push.imm.e 30
00000274: conv.i.v
00000278: push.v pop
00000280: call action_draw_variable(argc=3)
00000288: popz
0000028C: popenv 0x41E64B8
00000290: push.imm.e 156
00000294: pushenv 0x21E651C
00000298: push.imm.e 30
0000029C: push.global.v global.upp
000002A4: add.v.i
000002A8: push.imm.e 142
000002AC: conv.i.v
000002B0: push.v oil
000002B8: call action_draw_variable(argc=3)
000002C0: popz
000002C4: popenv 0x41E64F0
000002C8: push.imm.e 156
000002CC: pushenv 0x21E6554
000002D0: push.imm.e 30
000002D4: push.global.v global.upp
000002DC: add.v.i
000002E0: push.imm.e 228
000002E4: conv.i.v
000002E8: push.v ele
000002F0: call action_draw_variable(argc=3)
000002F8: popz
000002FC: popenv 0x41E6528
00000300: push.imm.e 156
00000304: pushenv 0x21E658C
00000308: push.imm.e 30
0000030C: push.global.v global.upp
00000314: add.v.i
00000318: push.imm.e 340
0000031C: conv.i.v
00000320: push.v mon
00000328: call action_draw_variable(argc=3)
00000330: popz
00000334: popenv 0x41E6560
00000338: push.imm.e 156
0000033C: pushenv 0x21E65C4
00000340: push.imm.e 40
00000344: push.global.v global.upp
0000034C: add.v.i
00000350: push.imm.e 448
00000354: conv.i.v
00000358: push.v time
00000360: call action_draw_variable(argc=3)
00000368: popz
0000036C: popenv 0x41E6598
00000370: push.imm.e 0
00000374: conv.i.v
00000378: push.imm.e 1
0000037C: conv.i.v
00000380: push.v mon
00000388: call action_if_variable(argc=3)
00000390: pop.v.v local.__b__
00000398: push.local.v local.__b__
000003A0: conv.v.b
000003A4: bf 0x21E6630
000003A8: push.imm.e 20
000003AC: push.global.v global.upp
000003B4: add.v.i
000003B8: push.imm.e 456
000003BC: conv.i.v
000003C0: push.s "Jan"
000003C8: conv.s.v
000003CC: call action_draw_text(argc=3)
000003D4: popz
000003D8: push.imm.e 0
000003DC: conv.i.v
000003E0: push.imm.e 2
000003E4: conv.i.v
000003E8: push.v mon
000003F0: call action_if_variable(argc=3)
000003F8: pop.v.v local.__b__
00000400: push.local.v local.__b__
00000408: conv.v.b
0000040C: bf 0x21E6698
00000410: push.imm.e 20
00000414: push.global.v global.upp
0000041C: add.v.i
00000420: push.imm.e 456
00000424: conv.i.v
00000428: push.s "Feb"
00000430: conv.s.v
00000434: call action_draw_text(argc=3)
0000043C: popz
00000440: push.imm.e 0
00000444: conv.i.v
00000448: push.imm.e 3
0000044C: conv.i.v
00000450: push.v mon
00000458: call action_if_variable(argc=3)
00000460: pop.v.v local.__b__
00000468: push.local.v local.__b__
00000470: conv.v.b
00000474: bf 0x21E6700
00000478: push.imm.e 20
0000047C: push.global.v global.upp
00000484: add.v.i
00000488: push.imm.e 456
0000048C: conv.i.v
00000490: push.s "Mar"
00000498: conv.s.v
0000049C: call action_draw_text(argc=3)
000004A4: popz
000004A8: push.imm.e 0
000004AC: conv.i.v
000004B0: push.imm.e 4
000004B4: conv.i.v
000004B8: push.v mon
000004C0: call action_if_variable(argc=3)
000004C8: pop.v.v local.__b__
000004D0: push.local.v local.__b__
000004D8: conv.v.b
000004DC: bf 0x21E6768
000004E0: push.imm.e 20
000004E4: push.global.v global.upp
000004EC: add.v.i
000004F0: push.imm.e 456
000004F4: conv.i.v
000004F8: push.s "Apr"
00000500: conv.s.v
00000504: call action_draw_text(argc=3)
0000050C: popz
00000510: push.imm.e 0
00000514: conv.i.v
00000518: push.imm.e 5
0000051C: conv.i.v
00000520: push.v mon
00000528: call action_if_variable(argc=3)
00000530: pop.v.v local.__b__
00000538: push.local.v local.__b__
00000540: conv.v.b
00000544: bf 0x21E67D0
00000548: push.imm.e 20
0000054C: push.global.v global.upp
00000554: add.v.i
00000558: push.imm.e 456
0000055C: conv.i.v
00000560: push.s "May"
00000568: conv.s.v
0000056C: call action_draw_text(argc=3)
00000574: popz
00000578: push.imm.e 0
0000057C: conv.i.v
00000580: push.imm.e 6
00000584: conv.i.v
00000588: push.v mon
00000590: call action_if_variable(argc=3)
00000598: pop.v.v local.__b__
000005A0: push.local.v local.__b__
000005A8: conv.v.b
000005AC: bf 0x21E6838
000005B0: push.imm.e 20
000005B4: push.global.v global.upp
000005BC: add.v.i
000005C0: push.imm.e 456
000005C4: conv.i.v
000005C8: push.s "Jun"
000005D0: conv.s.v
000005D4: call action_draw_text(argc=3)
000005DC: popz
000005E0: push.imm.e 0
000005E4: conv.i.v
000005E8: push.imm.e 7
000005EC: conv.i.v
000005F0: push.v mon
000005F8: call action_if_variable(argc=3)
00000600: pop.v.v local.__b__
00000608: push.local.v local.__b__
00000610: conv.v.b
00000614: bf 0x21E68A0
00000618: push.imm.e 20
0000061C: push.global.v global.upp
00000624: add.v.i
00000628: push.imm.e 456
0000062C: conv.i.v
00000630: push.s "Jul"
00000638: conv.s.v
0000063C: call action_draw_text(argc=3)
00000644: popz
00000648: push.imm.e 0
0000064C: conv.i.v
00000650: push.imm.e 8
00000654: conv.i.v
00000658: push.v mon
00000660: call action_if_variable(argc=3)
00000668: pop.v.v local.__b__
00000670: push.local.v local.__b__
00000678: conv.v.b
0000067C: bf 0x21E6908
00000680: push.imm.e 20
00000684: push.global.v global.upp
0000068C: add.v.i
00000690: push.imm.e 456
00000694: conv.i.v
00000698: push.s "Aug"
000006A0: conv.s.v
000006A4: call action_draw_text(argc=3)
000006AC: popz
000006B0: push.imm.e 0
000006B4: conv.i.v
000006B8: push.imm.e 9
000006BC: conv.i.v
000006C0: push.v mon
000006C8: call action_if_variable(argc=3)
000006D0: pop.v.v local.__b__
000006D8: push.local.v local.__b__
000006E0: conv.v.b
000006E4: bf 0x21E6970
000006E8: push.imm.e 20
000006EC: push.global.v global.upp
000006F4: add.v.i
000006F8: push.imm.e 456
000006FC: conv.i.v
00000700: push.s "Sep"
00000708: conv.s.v
0000070C: call action_draw_text(argc=3)
00000714: popz
00000718: push.imm.e 0
0000071C: conv.i.v
00000720: push.imm.e 10
00000724: conv.i.v
00000728: push.v mon
00000730: call action_if_variable(argc=3)
00000738: pop.v.v local.__b__
00000740: push.local.v local.__b__
00000748: conv.v.b
0000074C: bf 0x21E69D8
00000750: push.imm.e 20
00000754: push.global.v global.upp
0000075C: add.v.i
00000760: push.imm.e 456
00000764: conv.i.v
00000768: push.s "Oct"
00000770: conv.s.v
00000774: call action_draw_text(argc=3)
0000077C: popz
00000780: push.imm.e 0
00000784: conv.i.v
00000788: push.imm.e 11
0000078C: conv.i.v
00000790: push.v mon
00000798: call action_if_variable(argc=3)
000007A0: pop.v.v local.__b__
000007A8: push.local.v local.__b__
000007B0: conv.v.b
000007B4: bf 0x21E6A40
000007B8: push.imm.e 20
000007BC: push.global.v global.upp
000007C4: add.v.i
000007C8: push.imm.e 456
000007CC: conv.i.v
000007D0: push.s "Nov"
000007D8: conv.s.v
000007DC: call action_draw_text(argc=3)
000007E4: popz
000007E8: push.imm.e 0
000007EC: conv.i.v
000007F0: push.imm.e 12
000007F4: conv.i.v
000007F8: push.v mon
00000800: call action_if_variable(argc=3)
00000808: pop.v.v local.__b__
00000810: push.local.v local.__b__
00000818: conv.v.b
0000081C: bf 0x21E6AA8
00000820: push.imm.e 20
00000824: push.global.v global.upp
0000082C: add.v.i
00000830: push.imm.e 456
00000834: conv.i.v
00000838: push.s "Dec"
00000840: conv.s.v
00000844: call action_draw_text(argc=3)
0000084C: popz