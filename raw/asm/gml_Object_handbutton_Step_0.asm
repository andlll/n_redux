// gml_Object_handbutton_Step_0  locals=2 args=0 len=464
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 617
00000030: pushenv 0x21E4720
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.v menoo
0000004C: call action_if_variable(argc=3)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: bf 0x21E4720
0000006C: b 0x21E4728
00000070: popenv 0x41E46E4
00000074: b 0x21E472C
00000078: popenv 0x1DE4728
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x21E4780
0000008C: push.imm.e -1
00000090: push.imm.e 0
00000094: push.v obj0.view_hview[array]
0000009C: push.imm.e -1
000000A0: push.imm.e 0
000000A4: push.v obj0.view_yview[array]
000000AC: add.v.v
000000B0: push.imm.e -1
000000B4: push.imm.e 0
000000B8: push.v obj0.view_xview[array]
000000C0: call action_move_to(argc=2)
000000C8: popz
000000CC: b 0x21E479C
000000D0: push.imm.e -1000
000000D4: conv.i.v
000000D8: push.imm.e -1000
000000DC: conv.i.v
000000E0: call action_move_to(argc=2)
000000E8: popz
000000EC: push.imm.e 0
000000F0: conv.i.v
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.v over
00000104: call action_if_variable(argc=3)
0000010C: pop.v.v local.__b__
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x21E4880
00000124: push.imm.e 156
00000128: pushenv 0x21E4818
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.v selec
00000144: call action_if_variable(argc=3)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x21E4818
00000164: b 0x21E4820
00000168: popenv 0x41E47DC
0000016C: b 0x21E4824
00000170: popenv 0x1DE4820
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x21E485C
00000184: push.imm.e 1
00000188: conv.i.v
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.imm.e 484
00000198: conv.i.v
0000019C: call action_sprite_set(argc=3)
000001A4: popz
000001A8: b 0x21E4880
000001AC: push.imm.e 1
000001B0: conv.i.v
000001B4: push.imm.e 0
000001B8: conv.i.v
000001BC: push.imm.e 483
000001C0: conv.i.v
000001C4: call action_sprite_set(argc=3)
000001CC: popz