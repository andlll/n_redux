// gml_Object_pudj_Step_0  locals=2 args=0 len=880
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.v obj140.x
00000034: push.v obj141.x
0000003C: sub.v.v
00000040: pop.v.v shifta
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.v shifta
00000060: call action_if_variable(argc=3)
00000068: pop.v.v local.__b__
00000070: push.local.v local.__b__
00000078: conv.v.b
0000007C: bf 0x21E2698
00000080: push.imm.e 0
00000084: pop.v.i shifta
0000008C: push.imm.e 1
00000090: conv.i.v
00000094: push.imm.e -1000
00000098: conv.i.v
0000009C: push.v shifta
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x21E26DC
000000C4: push.imm.e -1000
000000C8: pop.v.i shifta
000000D0: push.imm.e 617
000000D4: pushenv 0x21E2720
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.v menoo
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21E2720
00000110: b 0x21E2728
00000114: popenv 0x41E26E4
00000118: b 0x21E272C
0000011C: popenv 0x1DE2728
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21E27A0
00000130: push.imm.e -1
00000134: push.imm.e 0
00000138: push.v obj0.view_hview[array]
00000140: push.imm.e -1
00000144: push.imm.e 0
00000148: push.v obj0.view_yview[array]
00000150: add.v.v
00000154: push.imm.e -1
00000158: push.imm.e 0
0000015C: push.v obj0.view_xview[array]
00000164: push.imm.e 492
00000168: push.global.v global.sca
00000170: mul.v.i
00000174: add.v.v
00000178: push.v shifta
00000180: add.v.v
00000184: call action_move_to(argc=2)
0000018C: popz
00000190: b 0x21E27BC
00000194: push.imm.e -1000
00000198: conv.i.v
0000019C: push.imm.e -1000
000001A0: conv.i.v
000001A4: call action_move_to(argc=2)
000001AC: popz
000001B0: push.imm.e 0
000001B4: conv.i.v
000001B8: push.imm.e 1
000001BC: conv.i.v
000001C0: push.v unlosei
000001C8: call action_if_variable(argc=3)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x21E28D8
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.v over
00000200: call action_if_variable(argc=3)
00000208: pop.v.v local.__b__
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: bf 0x21E28D8
00000220: push.imm.e 156
00000224: pushenv 0x21E2870
00000228: push.imm.e 0
0000022C: conv.i.v
00000230: push.imm.e 60
00000234: conv.i.v
00000238: push.v selec
00000240: call action_if_variable(argc=3)
00000248: pop.v.v local.__b__
00000250: push.local.v local.__b__
00000258: conv.v.b
0000025C: bf 0x21E2870
00000260: b 0x21E2878
00000264: popenv 0x41E2834
00000268: b 0x21E287C
0000026C: popenv 0x1DE2878
00000270: push.local.v local.__b__
00000278: conv.v.b
0000027C: bf 0x21E28B4
00000280: push.imm.e 1
00000284: conv.i.v
00000288: push.imm.e 0
0000028C: conv.i.v
00000290: push.imm.e 470
00000294: conv.i.v
00000298: call action_sprite_set(argc=3)
000002A0: popz
000002A4: b 0x21E28D8
000002A8: push.imm.e 1
000002AC: conv.i.v
000002B0: push.imm.e 0
000002B4: conv.i.v
000002B8: push.imm.e 459
000002BC: conv.i.v
000002C0: call action_sprite_set(argc=3)
000002C8: popz
000002CC: push.imm.e 0
000002D0: conv.i.v
000002D4: push.imm.e 0
000002D8: conv.i.v
000002DC: push.v unlosei
000002E4: call action_if_variable(argc=3)
000002EC: pop.v.v local.__b__
000002F4: push.local.v local.__b__
000002FC: conv.v.b
00000300: bf 0x21E297C
00000304: push.imm.e 154
00000308: pushenv 0x21E2954
0000030C: push.imm.e 0
00000310: conv.i.v
00000314: push.imm.e 2
00000318: conv.i.v
0000031C: push.v level
00000324: call action_if_variable(argc=3)
0000032C: pop.v.v local.__b__
00000334: push.local.v local.__b__
0000033C: conv.v.b
00000340: bf 0x21E2954
00000344: b 0x21E295C
00000348: popenv 0x41E2918
0000034C: b 0x21E2960
00000350: popenv 0x1DE295C
00000354: push.local.v local.__b__
0000035C: conv.v.b
00000360: bf 0x21E297C
00000364: push.imm.e 1
00000368: pop.v.i unlosei