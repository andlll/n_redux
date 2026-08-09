// gml_Object_backobutton_Step_0  locals=2 args=0 len=704
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
0000007C: bf 0x21E5844
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
000000C0: bf 0x21E5888
000000C4: push.imm.e -1000
000000C8: pop.v.i shifta
000000D0: push.imm.e 617
000000D4: pushenv 0x21E58CC
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v menoo
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21E58CC
00000110: b 0x21E58D4
00000114: popenv 0x41E5890
00000118: b 0x21E58D8
0000011C: popenv 0x1DE58D4
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21E5904
00000130: push.imm.e -1000
00000134: conv.i.v
00000138: push.imm.e -1000
0000013C: conv.i.v
00000140: call action_move_to(argc=2)
00000148: popz
0000014C: push.imm.e 617
00000150: pushenv 0x21E5948
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: push.imm.e 1
00000160: conv.i.v
00000164: push.v menoo
0000016C: call action_if_variable(argc=3)
00000174: pop.v.v local.__b__
0000017C: push.local.v local.__b__
00000184: conv.v.b
00000188: bf 0x21E5948
0000018C: b 0x21E5950
00000190: popenv 0x41E590C
00000194: b 0x21E5954
00000198: popenv 0x1DE5950
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: bf 0x21E59C4
000001AC: push.imm.e -1
000001B0: push.imm.e 0
000001B4: push.v obj0.view_hview[array]
000001BC: push.imm.e -1
000001C0: push.imm.e 0
000001C4: push.v obj0.view_yview[array]
000001CC: add.v.v
000001D0: push.imm.e -1
000001D4: push.imm.e 0
000001D8: push.v obj0.view_xview[array]
000001E0: push.v shifta
000001E8: add.v.v
000001EC: push.imm.e 1216
000001F0: push.global.v global.sca
000001F8: mul.v.i
000001FC: add.v.v
00000200: call action_move_to(argc=2)
00000208: popz
0000020C: push.imm.e 617
00000210: pushenv 0x21E5A08
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 2
00000220: conv.i.v
00000224: push.v menoo
0000022C: call action_if_variable(argc=3)
00000234: pop.v.v local.__b__
0000023C: push.local.v local.__b__
00000244: conv.v.b
00000248: bf 0x21E5A08
0000024C: b 0x21E5A10
00000250: popenv 0x41E59CC
00000254: b 0x21E5A14
00000258: popenv 0x1DE5A10
0000025C: push.local.v local.__b__
00000264: conv.v.b
00000268: bf 0x21E5A78
0000026C: push.imm.e -1
00000270: push.imm.e 0
00000274: push.v obj0.view_hview[array]
0000027C: push.imm.e -1
00000280: push.imm.e 0
00000284: push.v obj0.view_yview[array]
0000028C: add.v.v
00000290: push.imm.e -1
00000294: push.imm.e 0
00000298: push.v obj0.view_xview[array]
000002A0: push.imm.e 460
000002A4: push.global.v global.sca
000002AC: mul.v.i
000002B0: add.v.v
000002B4: call action_move_to(argc=2)
000002BC: popz