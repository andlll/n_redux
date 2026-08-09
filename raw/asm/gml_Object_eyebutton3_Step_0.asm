// gml_Object_eyebutton3_Step_0  locals=2 args=0 len=388
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 159
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E5038
00000038: push.d 0.5
00000044: conv.d.v
00000048: push.i 16777215
00000050: conv.i.v
00000054: call action_sprite_color(argc=2)
0000005C: popz
00000060: b 0x21E5058
00000064: push.imm.e 1
00000068: conv.i.v
0000006C: push.i 16777215
00000074: conv.i.v
00000078: call action_sprite_color(argc=2)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.global.v global.sca
0000009C: push.global.v global.sca
000000A4: call action_sprite_transform(argc=4)
000000AC: popz
000000B0: push.imm.e 617
000000B4: pushenv 0x21E50C8
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.imm.e 2
000000C4: conv.i.v
000000C8: push.v menoo
000000D0: call action_if_variable(argc=3)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: bf 0x21E50C8
000000F0: b 0x21E50D0
000000F4: popenv 0x41E508C
000000F8: b 0x21E50D4
000000FC: popenv 0x1DE50D0
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21E513C
00000110: push.imm.e -1
00000114: push.imm.e 0
00000118: push.v obj0.view_hview[array]
00000120: push.imm.e -1
00000124: push.imm.e 0
00000128: push.v obj0.view_yview[array]
00000130: add.v.v
00000134: push.imm.e -1
00000138: push.imm.e 0
0000013C: push.v obj0.view_xview[array]
00000144: push.imm.e 184
00000148: push.global.v global.sca
00000150: mul.v.i
00000154: add.v.v
00000158: call action_move_to(argc=2)
00000160: popz
00000164: b 0x21E5158
00000168: push.imm.e -1000
0000016C: conv.i.v
00000170: push.imm.e -1000
00000174: conv.i.v
00000178: call action_move_to(argc=2)
00000180: popz