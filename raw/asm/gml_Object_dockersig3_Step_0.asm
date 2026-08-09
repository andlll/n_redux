// gml_Object_dockersig3_Step_0  locals=2 args=0 len=216
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 455
00000030: pushenv 0x20BABE0
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 1
00000040: conv.i.v
00000044: push.v night
0000004C: call action_if_variable(argc=3)
00000054: pop.v.v local.__b__
0000005C: push.local.v local.__b__
00000064: conv.v.b
00000068: not.b.d
0000006C: bf 0x20BABE0
00000070: b 0x20BABE8
00000074: popenv 0x40BABA0
00000078: b 0x20BABEC
0000007C: popenv 0x1CBABE8
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: not.b.d
00000090: bf 0x20BAC44
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.v active
000000AC: call action_if_variable(argc=3)
000000B4: pop.v.v local.__b__
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x20BAC44
000000CC: call action_kill_object(argc=0)
000000D4: popz