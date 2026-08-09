// gml_Object_loanoscrino_Step_0  locals=2 args=0 len=412
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 4
00000038: conv.i.v
0000003C: push.builtin.v os_type
00000044: call action_if_variable(argc=3)
0000004C: pop.v.v local.__b__
00000054: push.local.v local.__b__
0000005C: conv.v.b
00000060: bf 0x20C2A40
00000064: push.imm.e -1
00000068: push.imm.e 0
0000006C: push.v obj0.view_yview[array]
00000074: push.imm.e -1
00000078: push.imm.e 0
0000007C: push.v obj0.view_hview[array]
00000084: push.imm.e 2
00000088: conv.i.d
0000008C: div.d.v
00000090: add.v.v
00000094: push.imm.e -1
00000098: push.imm.e 0
0000009C: push.v obj0.view_xview[array]
000000A4: push.imm.e -1
000000A8: push.imm.e 0
000000AC: push.v obj0.view_wview[array]
000000B4: push.imm.e 2
000000B8: conv.i.d
000000BC: div.d.v
000000C0: add.v.v
000000C4: call action_move_to(argc=2)
000000CC: popz
000000D0: push.imm.e 132
000000D4: pushenv 0x20C2A84
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.v loaned
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20C2A84
00000110: b 0x20C2A8C
00000114: popenv 0x40C2A48
00000118: b 0x20C2A90
0000011C: popenv 0x1CC2A8C
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20C2B0C
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.imm.e 697
00000140: pushenv 0x20C2AC0
00000144: call action_kill_object(argc=0)
0000014C: popz
00000150: popenv 0x40C2AB4
00000154: push.imm.e 699
00000158: pushenv 0x20C2AD8
0000015C: call action_kill_object(argc=0)
00000164: popz
00000168: popenv 0x40C2ACC
0000016C: push.imm.e 701
00000170: pushenv 0x20C2AF0
00000174: call action_kill_object(argc=0)
0000017C: popz
00000180: popenv 0x40C2AE4
00000184: push.imm.e 703
00000188: pushenv 0x20C2B08
0000018C: call action_kill_object(argc=0)
00000194: popz
00000198: popenv 0x40C2AFC